package com.lecarden.result.common.mapper.impl;

import com.lecarden.result.common.mapper.ResultMapper;
import com.lecarden.result.common.mapper.WordResultMapper;
import com.lecarden.result.persistence.entity.Result;
import com.lecarden.result.persistence.to.ResultTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResultMapperImpl implements ResultMapper {

    private WordResultMapper wordResultMapper;

    @Autowired
    public ResultMapperImpl(WordResultMapper wordResultMapper) {
        this.wordResultMapper = wordResultMapper;
    }

    @Override
    public ResultTO mapToResultTO(Result result) {
        if (result != null) {
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
        return null;
    }

    @Override
    public Result mapToResult(ResultTO resultTO) {
        if (resultTO != null) {
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
        return null;
    }

    @Override
    public List<ResultTO> mapToResultsTOs(List<Result> results) {
        List<ResultTO> resultsList = new ArrayList<>();
        results.forEach(r -> resultsList.add(mapToResultTO(r)));

        return resultsList;
    }
}
