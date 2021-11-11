package lecarden.email.service;

import lecarden.email.entity.EmailInformation;

public interface EmailService {
    void sendConfirmationRegisterEmail(EmailInformation emailInformation);
    void sendPasswordToken(EmailInformation emailInformation);
}
