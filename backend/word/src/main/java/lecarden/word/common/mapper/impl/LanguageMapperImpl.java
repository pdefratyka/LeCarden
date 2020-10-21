package lecarden.word.common.mapper.impl;

import lecarden.word.common.mapper.LanguageMapper;
import lecarden.word.persistence.entity.Language;
import lecarden.word.persistence.to.LanguageTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LanguageMapperImpl implements LanguageMapper {

    @Override
    public LanguageTO mapToLanguageTO(Language language) {
        if (language != null) {
            return LanguageTO.builder()
                    .id(language.getId())
                    .foreignLanguage(language.getForeignLanguage())
                    .knownLanguage(language.getKnownLanguage())
                    .build();
        } else {
            return null;
        }

    }

    @Override
    public List<LanguageTO> mapToLanguagesTOs(List<Language> languages) {
        List<LanguageTO> languagesTOs = new ArrayList<>();

        for (Language language : languages) {
            languagesTOs.add(mapToLanguageTO(language));
        }

        return languagesTOs;
    }

    @Override
    public Language mapToLanguage(LanguageTO languageTO) {
        if (languageTO != null) {
            return Language.builder()
                    .id(languageTO.getId())
                    .foreignLanguage(languageTO.getForeignLanguage())
                    .knownLanguage(languageTO.getKnownLanguage())
                    .build();
        } else {
            return null;
        }
    }
}