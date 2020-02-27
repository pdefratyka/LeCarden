package lecarden.word.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("word")
public class WordController {

    @GetMapping()
    public String getAllWords(){
        return "words";
    }
}
