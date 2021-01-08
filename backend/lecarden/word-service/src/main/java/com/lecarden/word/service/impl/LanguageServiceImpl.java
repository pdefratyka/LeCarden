package com.lecarden.word.service.impl;

import com.lecarden.word.common.mapper.LanguageMapper;
import com.lecarden.word.persistence.repository.LanguageRepository;
import com.lecarden.word.persistence.to.LanguageTO;
import com.lecarden.word.service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LanguageServiceImpl implements LanguageService {

    private LanguageRepository languageRepository;
    private LanguageMapper languageMapper;

    @Autowired
    public LanguageServiceImpl(LanguageRepository languageRepository, LanguageMapper languageMapper) {
        this.languageRepository = languageRepository;
        this.languageMapper = languageMapper;
    }

    @Override
    public List<LanguageTO> getAllLanguages() {
        return this.languageMapper.mapToLanguagesTOs(this.languageRepository.findAll());
    }
}
