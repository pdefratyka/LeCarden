package lecarden.email.controller;

import lecarden.email.entity.EmailInformation;
import lecarden.email.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class EmailController {

    private EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("register-confirmation")
    public void sendConfirmationRegisterEmail(@RequestBody EmailInformation emailInformation) {
        emailService.sendConfirmationRegisterEmail(emailInformation);
    }

    @PostMapping("forgot-password-token")
    public void sendPasswordToken(@RequestBody EmailInformation emailInformation) {
        emailService.sendPasswordToken(emailInformation);
    }
}
