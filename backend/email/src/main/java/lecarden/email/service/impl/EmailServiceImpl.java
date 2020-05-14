package lecarden.email.service.impl;

import lecarden.email.entity.User;
import lecarden.email.service.EmailService;
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
public class EmailServiceImpl implements EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
    private JavaMailSender javaMailSender;
    private ITemplateEngine templateEngine;
    private MimeMessage mail;

    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender, ITemplateEngine templateEngine){
        this.javaMailSender=javaMailSender;
        this.templateEngine=templateEngine;
    }

    @Override
    public void sendConfirmationRegisterEmail(User user) {
        try {
            buildMail(user).setText(processTemplate(user), true);
        } catch (MessagingException e) {
            logger.error("Email to: {} has not been send cause {}", user.getEmail(), e.getCause());
        }
        javaMailSender.send(this.mail);
    }

    private MimeMessageHelper buildMail(User user) {
        final String topic="Lecarden Confirmation";
        this.mail = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(mail, true);
            helper.setTo(user.getEmail());
            helper.setSubject(topic);
        } catch (MessagingException e) {
        }
        return helper;
    }

    private String processTemplate(User user) {
        Context context = new Context();
        context.setVariable("userName", user.getLogin());
        context.setVariable("confirmationLink", "http://localhost:9092/users?token="+user.getConfirmationToken());
        return templateEngine.process("registration_confirmation", context);
    }
}
