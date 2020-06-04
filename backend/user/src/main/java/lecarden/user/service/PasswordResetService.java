package lecarden.user.service;

import lecarden.user.persistence.entity.PasswordResetToken;
import lecarden.user.persistence.to.UserTO;

public interface PasswordResetService {
    PasswordResetToken savePasswordResetToken(UserTO user);
    PasswordResetToken findToken(String token);
}
