package lecarden.user.service;

import lecarden.user.persistence.entity.ConfirmationToken;
import lecarden.user.persistence.entity.User;

public interface ConfirmationTokenService {
    ConfirmationToken saveToken(ConfirmationToken confirmationToken);

    ConfirmationToken findLastToken(Long userId);

    User findUserByToken(String token);
}
