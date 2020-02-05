package lecarden.email.controller;

import lecarden.email.entity.Email;
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

    @PostMapping()
    public Email sendEmail(@RequestBody Email email){
        emailService.sendEmail(email);
        return email;
    }
}
