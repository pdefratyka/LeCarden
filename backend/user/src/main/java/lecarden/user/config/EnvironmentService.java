package lecarden.user.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class EnvironmentService {

    private Environment environment;

    @Autowired
    public EnvironmentService(Environment environment) {
        this.environment = environment;
    }

    public String getEmailRegisterConfirmationUrl() {
        return environment.getProperty("email.register-confirmation.url");
    }

    public String getEmailForgotPasswordUrl() {
        return environment.getProperty("email.forgot-password.url");
    }

    public String getTokenSecretKey(){
        return environment.getProperty("token.secret-key");
    }
}
