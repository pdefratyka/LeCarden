package lecarden.result.common.mapper.impl;

import lecarden.result.common.mapper.WordResultMapper;
import lecarden.result.persistence.entity.WordResult;
import lecarden.result.persistence.to.WordResultTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WordResultMapperImpl implements WordResultMapper {

    @Override
    public WordResultTO mapToWordResultTo(WordResult wordResult) {
        if (wordResult != null) {
            return WordResultTO.builder()
                    .id(wordResult.getId())
                    .wordId(wordResult.getWordId())
                    .attempts(wordResult.getAttempts())
                    .resultId(wordResult.getResultId())
                    .build();

        }
        return null;
    }

    @Override
    public WordResult mapToWordResult(WordResultTO wordResultTO) {
        if (wordResultTO != null) {
            return WordResult.builder()
                    .attempts(wordResultTO.getAttempts())
                    .id(wordResultTO.getId())
                    .wordId(wordResultTO.getWordId())
                    .resultId(wordResultTO.getResultId())
                    .build();

        }
        return null;
    }

    @Override
    public List<WordResultTO> mapToWordsResultsTos(List<WordResult> wordsResults) {
        List<WordResultTO> wordResultsList = new ArrayList<>();
        wordsResults.forEach(w -> wordResultsList.add(mapToWordResultTo(w)));

        return wordResultsList;
    }

    @Override
    public List<WordResult> mapToWordsResults(List<WordResultTO> wordsResultsTOs) {
        List<WordResult> wordsResults = new ArrayList<>();
        wordsResultsTOs.forEach(w -> wordsResults.add(mapToWordResult(w)));

        return wordsResults;
    }
}
