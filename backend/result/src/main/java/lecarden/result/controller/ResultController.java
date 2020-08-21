package lecarden.result.controller;

import lecarden.result.persistence.to.ResultTO;
import lecarden.result.service.ResultService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("results")
public class ResultController {

    private ResultService resultService;

    @Autowired
    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping
    public ResultTO saveResult(@RequestBody ResultTO resultTO) {
        log.info(resultTO);
        log.info("SAVE RESULT");
        return resultService.saveResult(resultTO);
    }

    @GetMapping
    public List<ResultTO> getResults() {
        log.info("GET ALL RESULTS RESULT");
        return resultService.getAllResults();
    }

    @GetMapping("/{resultId}")
    public ResultTO getResultById(@PathVariable Long resultId){
        log.info("GET RESULT BY ID RESULT");
        return resultService.getResultById(resultId);

    }

    @GetMapping("/users/{userId}/packets/{packetId}")
    public List<ResultTO> getLastResults(@PathVariable Long userId, @PathVariable Long packetId){
        log.info("GET LAST RESULT BY ID");
        return resultService.getLastResult(userId, packetId);
    }

    @GetMapping("/users/{userId}")
    public List<ResultTO> getAllLastResults(@PathVariable Long userId){
        log.info("Get all last results");
        return resultService.getAllLastResults(userId);
    }
}
