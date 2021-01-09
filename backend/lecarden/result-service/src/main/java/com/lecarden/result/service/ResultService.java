package com.lecarden.result.service;

import com.lecarden.result.persistence.to.ResultTO;

import java.util.List;

public interface ResultService {
    ResultTO saveResult(ResultTO resultTO);

    ResultTO getResultById(Long resultId);

    List<ResultTO> getLastResult(Long userId, Long packetId);

    List<ResultTO> getAllLastResults(Long userId);
}
