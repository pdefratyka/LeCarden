package com.lecarden.word.common.mapper.impl;

import com.lecarden.word.common.mapper.LanguageMapper;
import com.lecarden.word.common.mapper.WordMapper;
import com.lecarden.word.persistence.entity.Word;
import com.lecarden.word.persistence.to.WordTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WordMapperImpl implements WordMapper {

    private LanguageMapper languageMapper;

    @Autowired
    public WordMapperImpl(LanguageMapper languageMapper) {
        this.languageMapper = languageMapper;
    }

    @Override
    public Word mapToWord(WordTO wordTO) {
        if (wordTO != null) {
            return Word.builder()
                    .category(wordTO.getCategory())
                    .id(wordTO.getId())
                    .name(wordTO.getName())
                    .plural(wordTO.getPlural())
                    .translation(wordTO.getTranslation())
                    .userId(wordTO.getUserId())
                    .imageUrl(wordTO.getImageUrl())
                    .audioUrl(wordTO.getAudioUrl())
                    .builtIn(wordTO.getBuiltIn())
                    .example(wordTO.getExample())
                    .languageId(wordTO.getLanguageId())
                    .language(languageMapper.mapToLanguage(wordTO.getLanguageTO()))
                    .build();
        }
        return null;
    }

    @Override
    public WordTO mapToWordTO(Word word) {
        if (word != null) {
            return WordTO.builder()
                    .category(word.getCategory())
                    .id(word.getId())
                    .name(word.getName())
                    .plural(word.getPlural())
                    .translation(word.getTranslation())
                    .userId(word.getUserId())
                    .imageUrl(word.getImageUrl())
                    .audioUrl(word.getAudioUrl())
                    .builtIn(word.getBuiltIn())
                    .example(word.getExample())
                    .languageId(word.getLanguageId())
                    .languageTO(languageMapper.mapToLanguageTO(word.getLanguage()))
                    .build();
        }
        return null;
    }

    @Override
    public List<WordTO> mapToWordTOs(List<Word> words) {
        List<WordTO> wordTOs = new ArrayList<>();
        words.forEach(w -> wordTOs.add(mapToWordTO(w)));
        return wordTOs;
    }

    @Override
    public List<Word> mapToWords(List<WordTO> wordTOs) {
        List<Word> words = new ArrayList<>();
        wordTOs.forEach(w -> words.add(mapToWord(w)));
        return words;
    }
}
