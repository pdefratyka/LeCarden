package lecarden.result.common.mapper;

import lecarden.result.persistence.entity.WordResult;
import lecarden.result.persistence.to.WordResultTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WordResultMapper {


    public WordResultTO mapToWordResultTo(WordResult wordResult) {
        return WordResultTO.builder()
                .id(wordResult.getId())
                .wordId(wordResult.getWordId())
                .attempts(wordResult.getAttempts())
                .resultId(wordResult.getResultId())
                .build();
    }

    public WordResult mapToWordResult(WordResultTO wordResultTO) {
        return WordResult.builder()
                .attempts(wordResultTO.getAttempts())
                .id(wordResultTO.getId())
                .wordId(wordResultTO.getWordId())
                .resultId(wordResultTO.getResultId())
                .build();
    }

    public List<WordResultTO> mapToWordsResultsTos(List<WordResult> wordsResults) {
        List<WordResultTO> wordResultsList = new ArrayList<>();

        wordsResults.forEach(w -> wordResultsList.add(mapToWordResultTo(w)));

        return wordResultsList;
    }

    public List<WordResult> mapToWordsResults(List<WordResultTO> wordsResultsTOs) {
        List<WordResult> wordsResults = new ArrayList<>();

        wordsResultsTOs.forEach(w -> wordsResults.add(mapToWordResult(w)));
        return wordsResults;
    }
}
