package com.lecarden.word.controller;

import com.lecarden.word.persistence.to.LanguageTO;
import com.lecarden.word.service.LanguageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("languages")
@Slf4j
public class LanguageController {
    private LanguageService languageService;

    @Autowired
    LanguageController(LanguageService languageService) {
        this.languageService = languageService;
    }

    @GetMapping
    public ResponseEntity<List<LanguageTO>> getAllLanguages() {
        log.info("Get all languages");
        return new ResponseEntity<>(languageService.getAllLanguages(), HttpStatus.OK);
    }
}
