package lecarden.user.service.impl;

import lecarden.user.common.mapper.UserMapper;
import lecarden.user.common.validator.UserValidator;
import lecarden.user.persistence.entity.ConfirmationToken;
import lecarden.user.persistence.entity.User;
import lecarden.user.persistence.repository.UserRepository;
import lecarden.user.persistence.to.UserTO;
import lecarden.user.service.ConfirmationTokenService;
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
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper,
                           UserValidator userValidator, RestTemplate restTemplate, BCryptPasswordEncoder passwordEncoder,
                           ConfirmationTokenService confirmationTokenService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.userValidator = userValidator;
        this.restTemplate = restTemplate;
        this.passwordEncoder = passwordEncoder;
        this.confirmationTokenService = confirmationTokenService;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public UserTO addUser(UserTO userTO) {
        userValidator.validateUser(userTO);
        userTO.setConfirmed(false);
        userTO.setPassword(passwordEncoder.encode(userTO.getPassword()));
        UserTO savedUser = saveUserIfUnique(userTO);
        ConfirmationToken token = confirmationTokenService
                .saveToken(new ConfirmationToken(userMapper.mapToUser(savedUser)));
        sendConfirmationEmail(userTO, token.getConfirmationToken());
        return savedUser;
    }

    @Override
    public UserTO getUserByLogin(String login) {
        return userMapper.mapToUserTO(userRepository.findUserByLogin(login));
    }

    @Override
    public boolean confirmUser(String token) {
        User user = confirmationTokenService.findUserByToken(token);
        if (user != null) {
            user.setConfirmed(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public void sendConfirmationEmail(Long id) {
        User user=userRepository.getOne(id);
        ConfirmationToken token = confirmationTokenService
                .saveToken(new ConfirmationToken(user));
        sendConfirmationEmail(userMapper.mapToUserTO(user), token.getConfirmationToken());
    }

    private UserTO saveUserIfUnique(UserTO userTO) {
        try {
            userTO = userMapper.mapToUserTO(userRepository.save(userMapper.mapToUser(userTO)));
        } catch (DataIntegrityViolationException e) {
            userValidator.validateDataUnique(e);
        }
        return userTO;
    }

    private void sendConfirmationEmail(UserTO userTO, String token) {
        String emailConfirmation = "http://email-service/register-confirmation";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(createJsonToSendConfirmationEmail(userTO, token), headers);
        restTemplate.postForObject(emailConfirmation, entity, String.class);
    }

    private String createJsonToSendConfirmationEmail(UserTO userTO, String token) {
        JSONObject userJson = new JSONObject();
        userJson.put("login", userTO.getLogin());
        userJson.put("email", userTO.getEmail());
        userJson.put("confirmationToken", token);
        return userJson.toString();
    }
}
