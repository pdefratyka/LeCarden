package com.lecarden.word.common.mapper;

import com.lecarden.word.persistence.entity.Word;
import com.lecarden.word.persistence.to.WordTO;

import java.util.List;

public interface WordMapper {
    Word mapToWord(WordTO wordTO);

    WordTO mapToWordTO(Word word);

    List<WordTO> mapToWordTOs(List<Word> words);

    List<Word> mapToWords(List<WordTO> wordTOS);
}
