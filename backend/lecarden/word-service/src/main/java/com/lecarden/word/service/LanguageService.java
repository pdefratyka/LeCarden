package com.lecarden.word.service;

import com.lecarden.word.persistence.to.LanguageTO;

import java.util.List;

public interface LanguageService {
    List<LanguageTO> getAllLanguages();
}
