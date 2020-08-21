package lecarden.result.common.mapper;

import lecarden.result.persistence.entity.Result;
import lecarden.result.persistence.to.ResultTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResultMapper {

    private WordResultMapper wordResultMapper;

    @Autowired
    public ResultMapper(WordResultMapper wordResultMapper) {
        this.wordResultMapper = wordResultMapper;
    }

    public ResultTO mapToResultTO(Result result) {
        return ResultTO.builder()
                .id(result.getId())
                .packetId(result.getPacketId())
                .date(result.getDate())
                .score(result.getScore())
                .userId(result.getUserId())
                .learningMode(result.getLearningMode())
                .wordsResultsTOs(wordResultMapper.mapToWordsResultsTos(result.getWords()))
                .build();
    }

    public Result mapToResult(ResultTO resultTO){
        return Result.builder()
                .id(resultTO.getId())
                .date(resultTO.getDate())
                .packetId(resultTO.getPacketId())
                .score(resultTO.getScore())
                .userId(resultTO.getUserId())
                .learningMode(resultTO.getLearningMode())
                .words(wordResultMapper.mapToWordsResults(resultTO.getWordsResultsTOs()))
                .build();
    }

    public List<ResultTO> mapToResultsTOs(List<Result> results) {
        List<ResultTO> resultsList = new ArrayList<>();
        results.forEach(r -> resultsList.add(mapToResultTO(r)));

        return resultsList;
    }
}
