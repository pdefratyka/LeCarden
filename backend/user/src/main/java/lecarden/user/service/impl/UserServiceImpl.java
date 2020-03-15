package lecarden.user.service.impl;

import lecarden.user.common.mapper.UserMapper;
import lecarden.user.common.validator.UserValidator;
import lecarden.user.persistence.repository.UserRepository;
import lecarden.user.persistence.to.UserTO;
import lecarden.user.service.UserService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private UserRepository userRepository;
    private UserMapper userMapper;
    private UserValidator userValidator;
    private RestTemplate restTemplate;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper,
                           UserValidator userValidator, RestTemplate restTemplate, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.userValidator = userValidator;
        this.restTemplate = restTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public UserTO addUser(UserTO userTO) {
        userValidator.validateUser(userTO);
        userTO.setPassword(passwordEncoder.encode(userTO.getPassword()));
        UserTO userTo = saveUserIfUnique(userTO);
        //sendConfirmationEmail(userTO);
        return userTo;
    }

    @Override
    public UserTO getUserByLogin(String login) {
        return userMapper.mapToUserTO(userRepository.findUserByLogin(login));
    }

    private UserTO saveUserIfUnique(UserTO userTO) {
        try {
            userTO = userMapper.mapToUserTO(userRepository.save(userMapper.mapToUser(userTO)));
        } catch (DataIntegrityViolationException e) {
            userValidator.validateDataUnique(e);
        }
        return userTO;
    }

    private void sendConfirmationEmail(UserTO userTO) {
        String emailConfirmation = "http://email-service/registerConfirmation";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(createJsonToSendConfirmationEmail(userTO), headers);
        restTemplate.postForObject(emailConfirmation, entity, String.class);
    }

    private String createJsonToSendConfirmationEmail(UserTO userTO) {
        JSONObject userJson = new JSONObject();
        userJson.put("login", userTO.getLogin());
        userJson.put("email", userTO.getEmail());

        return userJson.toString();
    }
}
