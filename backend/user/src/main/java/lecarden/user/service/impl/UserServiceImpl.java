package lecarden.user.service.impl;

import lecarden.user.persistence.entity.User;
import lecarden.user.common.mapper.UserMapper;
import lecarden.user.persistence.repository.UserRepository;
import lecarden.user.service.UserService;
import lecarden.user.persistence.to.UserTO;
import lecarden.user.common.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private UserMapper userMapper;
    private UserValidator userValidator;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, UserValidator userValidator){
        this.userRepository=userRepository;
        this.userMapper=userMapper;
        this.userValidator=userValidator;
    }

    @Override
    public UserTO addUser(UserTO userTO) {
        userValidator.validateUser(userTO);
        userTO.setPassword(encodePassword(userTO.getPassword()));
        return saveUserIfUnique(userTO);
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
}
