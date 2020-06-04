package lecarden.user.service.impl;

import lecarden.user.common.mapper.UserMapper;
import lecarden.user.persistence.entity.PasswordResetToken;
import lecarden.user.persistence.repository.PasswordResetTokenRepository;
import lecarden.user.persistence.to.UserTO;
import lecarden.user.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {

    private PasswordResetTokenRepository passwordResetTokenRepository;
    private UserMapper userMapper;

    @Autowired
    public PasswordResetServiceImpl(PasswordResetTokenRepository passwordResetTokenRepository, UserMapper userMapper) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.userMapper = userMapper;
    }

    @Override
    public PasswordResetToken savePasswordResetToken(UserTO user) {
        return passwordResetTokenRepository.save(new PasswordResetToken(userMapper.mapToUser(user)));
    }

    @Override
    public PasswordResetToken findToken(String token) {
        return passwordResetTokenRepository.findByToken(token);
    }
}
