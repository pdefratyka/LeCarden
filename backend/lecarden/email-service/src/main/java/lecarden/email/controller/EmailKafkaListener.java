package lecarden.email.controller;

import lecarden.email.entity.EmailInformation;
import lecarden.email.service.EmailService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class EmailKafkaListener {

    private EmailService emailService;

    public EmailKafkaListener(EmailService emailService) {
        this.emailService = emailService;
    }

    @KafkaListener(topics = "${kafka.consumer.topic}")
    public void listenGroupFoo(EmailInformation message) {
        emailService.sendConfirmationRegisterEmail(message);
        System.out.println("Received Message: " + message);
    }
}
