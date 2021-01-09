package com.lecarden.result.service.impl;

import com.lecarden.result.common.mapper.ResultMapper;
import com.lecarden.result.common.mapper.WordResultMapper;
import com.lecarden.result.persistence.constants.LearningMode;
import com.lecarden.result.persistence.entity.Result;
import com.lecarden.result.persistence.repository.ResultRepository;
import com.lecarden.result.persistence.repository.WordResultRepository;
import com.lecarden.result.persistence.to.ResultTO;
import com.lecarden.result.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResultServiceImpl implements ResultService {

    private ResultRepository resultRepository;
    private WordResultRepository wordResultRepository;
    private WordResultMapper wordResultMapper;
    private ResultMapper resultMapper;

    @Autowired
    public ResultServiceImpl(ResultRepository resultRepository, ResultMapper resultMapper,
                             WordResultRepository wordResultRepository, WordResultMapper wordResultMapper) {
        this.resultRepository = resultRepository;
        this.resultMapper = resultMapper;
        this.wordResultRepository = wordResultRepository;
        this.wordResultMapper = wordResultMapper;
    }

    @Override
    public ResultTO saveResult(ResultTO resultTO) {
        ResultTO savedResult = resultMapper.mapToResultTO(resultRepository.save(resultMapper.mapToResult(resultTO)));
        resultTO.getWordsResultsTOs().forEach(wordResult -> {
            wordResult.setResultId(savedResult.getId());
        });
        resultTO.getWordsResultsTOs().forEach(wr -> wr.setResultId(savedResult.getId()));
        wordResultRepository.saveAll(wordResultMapper.mapToWordsResults(resultTO.getWordsResultsTOs()));

        return savedResult;
    }

    @Override
    public ResultTO getResultById(Long resultId) {
        return resultMapper.mapToResultTO(resultRepository.getOne(resultId));
    }

    @Override
    public List<ResultTO> getLastResult(Long userId, Long packetId) {
        List<Result> results = new ArrayList<>();
        Result lastForeignToKnownResult = resultRepository.
                findFirstByUserIdAndPacketIdAndLearningModeOrderByDateDesc(userId, packetId, LearningMode.FOREIGN_TO_KNOWN);
        Result lastKnownToForeignResult = resultRepository.
                findFirstByUserIdAndPacketIdAndLearningModeOrderByDateDesc(userId, packetId, LearningMode.KNOWN_TO_FOREIGN);
        if (lastForeignToKnownResult != null) {
            results.add(lastForeignToKnownResult);
        }
        if (lastKnownToForeignResult != null) {
            results.add(lastKnownToForeignResult);
        }

        return resultMapper.mapToResultsTOs(results);
    }

    @Override
    public List<ResultTO> getAllLastResults(Long userId) {
        return resultMapper.mapToResultsTOs(resultRepository.getAllLastResultsFromUser(userId));
    }
}
