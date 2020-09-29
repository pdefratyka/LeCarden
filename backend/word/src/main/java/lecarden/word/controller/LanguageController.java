package lecarden.word.controller;

import lecarden.word.persistence.to.LanguageTO;
import lecarden.word.service.LanguageService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("languages")
public class LanguageController {

    private LanguageService languageService;

    @Autowired
    public LanguageController(LanguageService languageService) {
        this.languageService = languageService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<LanguageTO> getAllLanguages() {
        return languageService.getAllLanguages();
    }
}
