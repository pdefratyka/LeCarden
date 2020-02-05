package lecarden.email.service.impl;

import lecarden.email.entity.Email;
import lecarden.email.entity.User;
import lecarden.email.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

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
            buildMail(user).setText(processTemplate(), true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        javaMailSender.send(this.mail);
    }

    private SimpleMailMessage setMailProperties(Email email){
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email.getReceiverAddress());
        msg.setSubject(email.getTopic());
        msg.setText(email.getBody());
        return msg;
    }

    private MimeMessageHelper buildMail(User user) {
        final String topic="Lecarden Confirmation";
        final String body="Hallo "+user.getLogin();
        this.mail = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(mail, true);
            helper.setTo(user.getEmail());
            helper.setSubject(topic);
            helper.setText(body);
        } catch (MessagingException e) {
        }
        return helper;
    }

    private String processTemplate() {
        Context context = new Context();
        return templateEngine.process("registration_confirmation", context);
    }
}
