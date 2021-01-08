package com.lecarden.word.common.mapper;

import com.lecarden.word.persistence.entity.Language;
import com.lecarden.word.persistence.to.LanguageTO;

import java.util.List;

public interface LanguageMapper {
    LanguageTO mapToLanguageTO(Language language);

    List<LanguageTO> mapToLanguagesTOs(List<Language> languages);

    Language mapToLanguage(LanguageTO languageTO);
}
