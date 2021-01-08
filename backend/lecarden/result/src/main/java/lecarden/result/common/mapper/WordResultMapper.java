package lecarden.result.common.mapper;

import lecarden.result.persistence.entity.WordResult;
import lecarden.result.persistence.to.WordResultTO;

import java.util.List;

public interface WordResultMapper {
    WordResultTO mapToWordResultTo(WordResult wordResult);

    WordResult mapToWordResult(WordResultTO wordResultTO);

    List<WordResultTO> mapToWordsResultsTos(List<WordResult> wordsResults);

    List<WordResult> mapToWordsResults(List<WordResultTO> wordsResultsTOs);
}
