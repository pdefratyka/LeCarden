package lecarden.filemanager.config;

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

    public String getSaveWordsListUrl() {
        return environment.getProperty("words.save-list.url");
    }
}