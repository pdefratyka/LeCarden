package lecarden.user.service.impl;

import lecarden.user.common.exception.TokenException;
import lecarden.user.common.exception.UserException;
import lecarden.user.common.mapper.UserMapper;
import lecarden.user.common.validator.UserValidator;
import lecarden.user.persistence.entity.ConfirmationToken;
import lecarden.user.persistence.entity.PasswordResetToken;
import lecarden.user.persistence.entity.User;
import lecarden.user.persistence.repository.UserRepository;
import lecarden.user.persistence.to.UserTO;
import lecarden.user.service.ConfirmationTokenService;
import lecarden.user.service.PasswordResetService;
import lecarden.user.service.UserService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
@Transactional(rollbackFor = Exception.class)
@PropertySource("classpath:application.properties")
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private UserRepository userRepository;
    private UserMapper userMapper;
    private UserValidator userValidator;
    private RestTemplate restTemplate;
    private BCryptPasswordEncoder passwordEncoder;
    private ConfirmationTokenService confirmationTokenService;
    private PasswordResetService passwordResetService;

    @Autowired
    private Environment env;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper,
                           UserValidator userValidator, RestTemplate restTemplate, BCryptPasswordEncoder passwordEncoder,
                           ConfirmationTokenService confirmationTokenService,
                           PasswordResetService passwordResetService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.userValidator = userValidator;
        this.restTemplate = restTemplate;
        this.passwordEncoder = passwordEncoder;
        this.confirmationTokenService = confirmationTokenService;
        this.passwordResetService = passwordResetService;
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

        sendToken(env.getProperty("email.register-confirmation.url"),
                savedUser.getLogin(), savedUser.getEmail(), token.getToken());
        return savedUser;
    }

    @Override
    public UserTO getUserByLogin(String login) {
        return userMapper.mapToUserTO(userRepository.findUserByLogin(login));
    }

    @Override
    public UserTO findUserByEmail(String userEmail) {
        return userMapper.mapToUserTO(userRepository.findUserByEmail(userEmail));
    }

    @Override
    @Transactional
    public UserTO updatePassword(String token, String password) {
        PasswordResetToken passwordResetToken = passwordResetService.findToken(token);
        if (passwordResetToken == null) {
            throw new TokenException("This token does not exist");
        }
        passwordResetToken.getUser().setPassword(passwordEncoder.encode(password));
        passwordResetService.deleteToken(passwordResetToken.getTokenId());
        return userMapper.mapToUserTO(userRepository.save(passwordResetToken.getUser()));
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
    public PasswordResetToken createPasswordResetToken(String email) {
        // make method find user by email private
        UserTO user = findUserByEmail(email);
        if (user != null) {
            PasswordResetToken token = passwordResetService.savePasswordResetToken(user);
            sendToken(env.getProperty("email.forgot-password.url"),
                    user.getLogin(), user.getEmail(), token.getToken());
        }
        return null;
    }

    @Override
    public void sendConfirmationEmail(Long id) {
        if (isSendingTokenAvailable(id)) {
            User user = userRepository.getOne(id);
            ConfirmationToken token = confirmationTokenService
                    .saveToken(new ConfirmationToken(user));
            sendToken(env.getProperty("email.register-confirmation.url"),
                    user.getLogin(), user.getEmail(), token.getToken());
        } else {
            logger.info("EXCEPTION");
            throw new UserException("You can try again later");
        }
    }

    private UserTO saveUserIfUnique(UserTO userTO) {
        try {
            userTO = userMapper.mapToUserTO(userRepository.save(userMapper.mapToUser(userTO)));
        } catch (DataIntegrityViolationException e) {
            userValidator.validateDataUnique(e);
        } catch (Exception e) {
            logger.error("Error during saving user: {}", e.getMessage());
        }
        return userTO;
    }

    private void sendToken(String url, String login, String email, String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(createJsonToSendToken(login, email, token), headers);
        restTemplate.postForObject(url, entity, String.class);
    }

    private boolean isSendingTokenAvailable(Long userId) {
        ConfirmationToken lastToken = confirmationTokenService.findLastToken(userId);
        return lastToken == null || lastToken.getCreatedDate().isBefore(LocalDateTime.now().minusHours(1));
    }

    private String createJsonToSendToken(String login, String email, String token) {
        JSONObject emailInformation = new JSONObject();
        emailInformation.put("userName", login);
        emailInformation.put("userEmail", email);
        emailInformation.put("token", token);
        return emailInformation.toString();
    }
}
