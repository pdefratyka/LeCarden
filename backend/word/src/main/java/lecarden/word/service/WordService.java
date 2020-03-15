package lecarden.word.service;

import lecarden.word.entity.Word;

public interface WordService {
    Word saveWord(Word word, String token);
}
