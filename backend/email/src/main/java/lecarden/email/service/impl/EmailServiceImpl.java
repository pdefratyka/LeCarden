package lecarden.email.service.impl;

import lecarden.email.entity.Email;
import lecarden.email.entity.User;
import lecarden.email.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private JavaMailSender javaMailSender;

    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender){
        this.javaMailSender=javaMailSender;
    }

    @Override
    public void sendConfirmationRegisterEmail(User user) {
        final String topic="Lecarden Confirmation";
        final String body="Hallo "+user.getLogin();
        javaMailSender.send(setMailProperties(new Email(user.getEmail(),topic,body)));
    }

    private SimpleMailMessage setMailProperties(Email email){
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email.getReceiverAddress());
        msg.setSubject(email.getTopic());
        msg.setText(email.getBody());
        return msg;
    }
}
