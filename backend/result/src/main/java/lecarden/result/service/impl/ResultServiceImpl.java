package lecarden.result.service.impl;

import lecarden.result.common.mapper.ResultMapper;
import lecarden.result.common.mapper.WordResultMapper;
import lecarden.result.persistence.constants.LearningMode;
import lecarden.result.persistence.entity.Result;
import lecarden.result.persistence.repository.ResultRepository;
import lecarden.result.persistence.repository.WordResultRepository;
import lecarden.result.persistence.to.ResultTO;
import lecarden.result.persistence.to.WordResultTO;
import lecarden.result.service.ResultService;
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
        for (WordResultTO wordResult : resultTO.getWordsResultsTOs()) {
            wordResult.setResultId(savedResult.getId());
            wordResultRepository.save(wordResultMapper.mapToWordResult(wordResult));
        }
        return savedResult;
    }

    @Override
    public ResultTO getResultById(Long resultId) {
        return resultMapper.mapToResultTO(resultRepository.getOne(resultId));
    }

    @Override
    public List<ResultTO> getAllResults() {
        return resultMapper.mapToResultsTOs(resultRepository.findAll());
    }

    @Override
    public List<ResultTO> getLastResult(Long userId, Long packetId) {
        List<Result> results=new ArrayList<>();
        Result tempResult=resultRepository.
                findFirstByUserIdAndPacketIdAndLearningModeOrderByDateDesc(userId,packetId, LearningMode.FOREGIN_TO_KNOWN);
        Result tempResult2=resultRepository.
                findFirstByUserIdAndPacketIdAndLearningModeOrderByDateDesc(userId,packetId, LearningMode.KNOWN_TO_FOREGIN);
        if(tempResult!=null){
            results.add(tempResult);
        }
        if(tempResult2!=null){
            results.add(tempResult2);
        }

        return resultMapper.mapToResultsTOs(results);
    }

    @Override
    public List<ResultTO> getAllLastResults(Long userId) {
        return resultMapper.mapToResultsTOs(resultRepository.getAllLastResultsFromUser(userId));
    }
}
