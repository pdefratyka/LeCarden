package com.lecarden.result.common.mapper;

import com.lecarden.result.persistence.entity.Result;
import com.lecarden.result.persistence.to.ResultTO;

import java.util.List;

public interface ResultMapper {
    ResultTO mapToResultTO(Result result);

    Result mapToResult(ResultTO resultTO);

    List<ResultTO> mapToResultsTOs(List<Result> results);
}
