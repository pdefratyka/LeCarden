package lecarden.email.config;

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

    public String getRegisterConfirmationUrl() {
        return environment.getProperty("email.confirmation-register.url");
    }

    public String getFrontendChangePassword() {
        return environment.getProperty("frontend.change-password.url");
    }
}
