package lecarden.email.service.impl;

import lecarden.email.common.constant.EmailType;
import lecarden.email.entity.EmailInformation;
import lecarden.email.service.EmailService;
import lecarden.email.service.helper.EmailCreatorService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
@Log4j2
public class EmailServiceImpl implements EmailService {

    private JavaMailSender javaMailSender;
    private EmailCreatorService emailCreatorService;

    @Autowired
    public EmailServiceImpl(EmailCreatorService emailCreatorService, JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
        this.emailCreatorService = emailCreatorService;
    }

    @Override
    public void sendConfirmationRegisterEmail(EmailInformation info) {
        javaMailSender.send(emailCreatorService
                .createEmail(EmailType.CONFIRMATION, info.getUserName(), info.getUserEmail(), info.getToken()));
    }

    @Override
    public void sendPasswordToken(EmailInformation info) {
        javaMailSender.send(emailCreatorService
                .createEmail(EmailType.CHANGE_PASSWORD, info.getUserName(), info.getUserEmail(), info.getToken()));
    }


}
