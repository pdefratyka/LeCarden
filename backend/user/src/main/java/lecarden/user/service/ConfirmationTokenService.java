package lecarden.user.service;

import lecarden.user.persistence.entity.ConfirmationToken;
import lecarden.user.persistence.entity.User;

public interface ConfirmationTokenService {
    ConfirmationToken saveToken(ConfirmationToken confirmationToken);
    User findUserByToken(String token);
}
