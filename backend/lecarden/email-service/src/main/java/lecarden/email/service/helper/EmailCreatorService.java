package lecarden.email.service.helper;

import lecarden.email.common.constant.EmailType;

import javax.mail.internet.MimeMessage;

public interface EmailCreatorService {
    MimeMessage createEmail(EmailType emailType, String login, String email, String token);
}
