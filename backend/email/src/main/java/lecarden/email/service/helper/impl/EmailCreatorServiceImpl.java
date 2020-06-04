package lecarden.email.service.helper.impl;

import lecarden.email.common.constant.EmailType;
import lecarden.email.common.exception.ProcessTemplateException;
import lecarden.email.service.helper.EmailCreatorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailCreatorServiceImpl implements EmailCreatorService {

    private static final Logger logger = LoggerFactory.getLogger(EmailCreatorServiceImpl.class);

    private JavaMailSender javaMailSender;
    private ITemplateEngine templateEngine;
    private MimeMessage mail;

    @Autowired
    private EmailCreatorServiceImpl(ITemplateEngine templateEngine, JavaMailSender javaMailSender) {
        this.templateEngine = templateEngine;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public MimeMessage createEmail(EmailType emailType, String login, String email, String token) {
        MimeMessageHelper helper = null;
        if (emailType.equals(EmailType.CONFIRMATION)) {
            helper = buildMail(email, "Lecarden Confirmation");
        } else if (emailType.equals(EmailType.CHANGE_PASSWORD)) {
            helper = buildMail(email, "Lecarden Change Password");
        }

        if (helper != null) {
            try {
                helper.setText(processTemplate(emailType, login, token), true);
            } catch (MessagingException e) {
                logger.error("Email to: {} has not been send cause {}", email, e.getCause());
            } catch (ProcessTemplateException e) {
                logger.error(e.getMessage());
            }
        }

        return mail;
    }


    private MimeMessageHelper buildMail(String email, String topic) {
        this.mail = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(mail, true);
            helper.setTo(email);
            helper.setSubject(topic);
        } catch (MessagingException e) {
            logger.error("Something went wrong with setting email attributes");
        }
        return helper;
    }

    private String processTemplate(EmailType emailType, String login, String token) throws ProcessTemplateException {
        if (emailType.equals(EmailType.CHANGE_PASSWORD)) {
            return this.processPasswordTemplate(login, token);
        } else if (emailType.equals(EmailType.CONFIRMATION)) {
            return this.processConfirmationTemplate(login, token);
        }
        throw new ProcessTemplateException("Wrong email type");
    }

    private String processConfirmationTemplate(String login, String token) {
        Context context = new Context();
        context.setVariable("userName", login);
        // this localhost should be in sobie variable in properties
        context.setVariable("confirmationLink", "http://localhost:9092/users?token=" + token);
        return templateEngine.process("registration_confirmation", context);
    }

    private String processPasswordTemplate(String login, String token) {
        Context context = new Context();
        context.setVariable("userName", login);
        context.setVariable("restartPasswordLink", "http://localhost:4200/change-password?token=" + token);
        return templateEngine.process("password_reset", context);
    }
}
