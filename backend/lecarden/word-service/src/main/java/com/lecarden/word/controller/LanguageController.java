package com.lecarden.word.controller;

import com.lecarden.word.persistence.to.LanguageTO;
import com.lecarden.word.service.LanguageService;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("languages")
public class LanguageController {
    private Logger logger = LoggerFactory.getLogger(LanguageController.class);
    private LanguageService languageService;

    @Autowired
    public LanguageController(LanguageService languageService) {
        this.languageService = languageService;
    }

    @GetMapping
    public List<LanguageTO> getAllLanguages() {
        return languageService.getAllLanguages();
    }
}
