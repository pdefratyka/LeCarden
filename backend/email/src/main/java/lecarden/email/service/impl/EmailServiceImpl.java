package lecarden.email.service.impl;

import lecarden.email.common.constant.EmailType;
import lecarden.email.entity.EmailInformation;
import lecarden.email.service.EmailService;
import lecarden.email.service.helper.EmailCreatorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
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
                .createEmail(EmailType.CHANGE_PASSWORD, info.getUserName(),
                        info.getUserEmail(), info.getToken()));
    }


}
