package lecarden.word.controller;

import lecarden.word.entity.Word;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("words")
@Log4j2
public class WordController {

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping()
    public Word saveWord(@RequestBody Word word) {
        log.info(word);
        return word;
    }

    @GetMapping()
    public String getWord() {
        return "Hello";
    }
}
