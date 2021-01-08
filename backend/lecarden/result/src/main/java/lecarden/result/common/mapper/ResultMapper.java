package lecarden.result.common.mapper;

import lecarden.result.persistence.entity.Result;
import lecarden.result.persistence.to.ResultTO;

import java.util.List;

public interface ResultMapper {
    ResultTO mapToResultTO(Result result);

    Result mapToResult(ResultTO resultTO);

    List<ResultTO> mapToResultsTOs(List<Result> results);
}
