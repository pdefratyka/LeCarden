package com.lecarden.word.service.impl;

import com.lecarden.word.common.mapper.LanguageMapper;
import com.lecarden.word.persistence.entity.Language;
import com.lecarden.word.persistence.repository.LanguageRepository;
import com.lecarden.word.persistence.to.LanguageTO;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.List;

import static junit.framework.TestCase.assertEquals;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class LanguageServiceImplTest {

    @Mock
    private LanguageRepository languageRepository;

    @Mock
    private LanguageMapper languageMapper;

    @InjectMocks
    private LanguageServiceImpl languageServiceImpl;

    @BeforeEach
    void setUp() {
    }

    @Test
    public void shouldReturnAllLanguages() {
        // given
        List<Language> languages = List.of(new Language());
        when(languageRepository.findAll()).thenReturn(languages);
        when(languageMapper.mapToLanguagesTOs(languages)).thenReturn(List.of(new LanguageTO()));
        // when
        List<LanguageTO> result = languageServiceImpl.getAllLanguages();
        // then
        assertAll(
                () -> assertEquals(languages.size(), (result.size())),
                () -> assertEquals(languages.get(0).getId(),result.get(0).getId()),
                () -> assertEquals(languages.get(0).getForeignLanguage(),result.get(0).getForeignLanguage()),
                () -> assertEquals(languages.get(0).getKnownLanguage(),result.get(0).getKnownLanguage())
        );
    }
}
