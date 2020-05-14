package lecarden.user.service.impl;

import lecarden.user.persistence.entity.ConfirmationToken;
import lecarden.user.persistence.entity.User;
import lecarden.user.persistence.repository.ConfirmationTokenRepository;
import lecarden.user.service.ConfirmationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService {

    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    public ConfirmationTokenServiceImpl(ConfirmationTokenRepository confirmationTokenRepository) {
        this.confirmationTokenRepository = confirmationTokenRepository;
    }

    @Override
    public ConfirmationToken saveToken(ConfirmationToken confirmationToken) {
        return confirmationTokenRepository.save(confirmationToken);
    }

    @Override
    public User findUserByToken(String token) {
        ConfirmationToken confirmationToken=confirmationTokenRepository.findFirstByConfirmationToken(token);
        if(confirmationToken!=null){
            return confirmationToken.getUser();
        }
        return null;
    }
}
