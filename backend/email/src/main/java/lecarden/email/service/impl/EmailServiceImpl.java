package lecarden.email.service.impl;

import lecarden.email.entity.Email;
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
    public void sendEmail(Email email) {
        javaMailSender.send(setMailProperties(email));
    }

    private SimpleMailMessage setMailProperties(Email email){
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email.getReceiverAddress());
        msg.setSubject(email.getTopic());
        msg.setText(email.getBody());
        return msg;
    }
}
