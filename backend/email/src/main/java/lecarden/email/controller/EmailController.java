package lecarden.email.controller;

import lecarden.email.entity.User;
import lecarden.email.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("email")
public class EmailController {

    private EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService){
        this.emailService=emailService;
    }

    @PostMapping("registerConfirmation")
    public void sendConfirmationRegisterEmail(@RequestBody User user){
        emailService.sendConfirmationRegisterEmail(user);
    }
}
