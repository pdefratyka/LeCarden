package lecarden.word.service;

import lecarden.word.persistence.to.LanguageTO;

import java.util.List;

public interface LanguageService {
    List<LanguageTO> getAllLanguages();
}
