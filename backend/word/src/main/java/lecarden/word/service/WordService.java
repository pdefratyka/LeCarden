package lecarden.word.service;

import lecarden.word.persistence.to.WordTO;

import java.util.List;

public interface WordService {
    WordTO saveWord(WordTO word);
    List<WordTO> getWordsByUserId(Long userId);
}
