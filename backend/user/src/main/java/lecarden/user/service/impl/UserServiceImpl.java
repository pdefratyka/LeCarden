package lecarden.user.service.impl;

import lecarden.user.persistence.entity.User;
import lecarden.user.common.mapper.UserMapper;
import lecarden.user.persistence.repository.UserRepository;
import lecarden.user.service.UserService;
import lecarden.user.persistence.to.UserTO;
import lecarden.user.common.validator.UserValidator;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private UserMapper userMapper;
    private UserValidator userValidator;
    private RestTemplate restTemplate;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, UserValidator userValidator, RestTemplate restTemplate){
        this.userRepository=userRepository;
        this.userMapper=userMapper;
        this.userValidator=userValidator;
        this.restTemplate=restTemplate;
    }

    @Override
    public UserTO addUser(UserTO userTO) {
        userValidator.validateUser(userTO);
        userTO.setPassword(encodePassword(userTO.getPassword()));
        UserTO userTo=saveUserIfUnique(userTO);
        sendConfirmationEmail(userTO);
        return userTo;
    }

    @Override
    public UserTO getUserById(Long userId) {
        return userMapper.mapToUserTO(userRepository.findById(userId).orElse(new User()));
    }

    @Override
    public List<UserTO> getAllUsers() {
        return userMapper.mapToUserTos(userRepository.findAll());
    }

    private String encodePassword(String password){
        return new BCryptPasswordEncoder().encode(password);
    }

    private UserTO saveUserIfUnique(UserTO userTO){
        try{
            userTO=userMapper.mapToUserTO(userRepository.save(userMapper.mapToUser(userTO)));
        }catch (DataIntegrityViolationException e){
            userValidator.validateDataUnique(e);
        }
        return userTO;
    }

    private void sendConfirmationEmail(UserTO userTO){
        String emailConfirmation="http://email-service/registerConfirmation";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity=new HttpEntity<>(createJsonToSendConfirmationEmail(userTO),headers);
        restTemplate.postForObject(emailConfirmation, entity, String.class);
    }

    private String createJsonToSendConfirmationEmail(UserTO userTO){
        JSONObject userJson=new JSONObject();
        userJson.put("login",userTO.getLogin());
        userJson.put("email",userTO.getEmail());

        return userJson.toString();
    }
}
