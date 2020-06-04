package lecarden.user.service;

import lecarden.user.persistence.entity.PasswordResetToken;
import lecarden.user.persistence.to.UserTO;

public interface UserService {
    UserTO addUser(UserTO userTO);

    UserTO getUserByLogin(String login);

    UserTO findUserByEmail(String userEmail);

    UserTO updatePassword(String token, String password);

    boolean confirmUser(String token);

    PasswordResetToken createPasswordResetToken(String email);

    void sendConfirmationEmail(Long id);
}
