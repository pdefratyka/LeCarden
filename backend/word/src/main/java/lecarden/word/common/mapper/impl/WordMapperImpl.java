package lecarden.word.common.mapper.impl;

import lecarden.word.common.mapper.WordMapper;
import lecarden.word.persistence.entity.Word;
import lecarden.word.persistence.to.WordTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WordMapperImpl implements WordMapper {

    @Override
    public Word mapToWord(WordTO wordTO) {
        return Word.builder()
                .category(wordTO.getCategory())
                .id(wordTO.getId())
                .name(wordTO.getName())
                .plural(wordTO.getPlural())
                .translation(wordTO.getTranslation())
                .userId(wordTO.getUserId())
                .imageUrl(wordTO.getImageUrl())
                .audioUrl(wordTO.getAudioUrl())
                .build();
    }

    @Override
    public WordTO mapToWordTO(Word word) {
        return WordTO.builder()
                .category(word.getCategory())
                .id(word.getId())
                .name(word.getName())
                .plural(word.getPlural())
                .translation(word.getTranslation())
                .userId(word.getUserId())
                .imageUrl(word.getImageUrl())
                .audioUrl(word.getAudioUrl())
                .build();
    }

    @Override
    public List<WordTO> mapToWordTOs(List<Word> words) {
        List<WordTO> wordTOs=new ArrayList<>();

        for(Word word:words){
            wordTOs.add(mapToWordTO(word));
        }

        return wordTOs;
    }

    @Override
    public List<Word> mapToWords(List<WordTO> wordTOS) {
        List<Word> words = new ArrayList<>();

        for(WordTO wordTO:wordTOS){
            words.add(mapToWord(wordTO));
        }

        return words;
    }
}
