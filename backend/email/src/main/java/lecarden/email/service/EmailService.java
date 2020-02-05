package lecarden.email.service;

import lecarden.email.entity.User;

public interface EmailService {
    void sendConfirmationRegisterEmail(User user);
}
