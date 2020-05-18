package lecarden.user.service;

import lecarden.user.persistence.to.UserTO;

public interface UserService {
    UserTO addUser(UserTO userTO);

    UserTO getUserByLogin(String login);

    boolean confirmUser(String token);

    void sendConfirmationEmail(Long id);
}
