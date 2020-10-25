package lecarden.word.service;

import lecarden.word.persistence.to.WordTO;

import java.util.List;

public interface WordService {
    WordTO saveWord(WordTO word);

    List<WordTO> saveWords(List<WordTO> words);

    WordTO updateWord(WordTO wordTO);

    List<String> getCategoriesByUserId(Long userId);

    List<WordTO> getWordsAccessibleForGivenUser(Long userId, String query, int pageNo);

    List<WordTO> getWordsFromPacket(Long packetId);

    void deleteWordById(Long wordId);
}
