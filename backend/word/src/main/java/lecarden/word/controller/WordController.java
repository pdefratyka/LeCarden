package lecarden.word.controller;

import lecarden.word.entity.Word;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("words")
public class WordController {

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    @RequestMapping("/userId/{userId}")
    public Word saveWord(@RequestBody Word word, @PathVariable Long userId) {
        log.info(word);
        log.info(userId);
        return word;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<Word> getAllWords() {
        List<Word> words = new ArrayList();
        words.add(new Word(1L,"Egal", "Obojętnie", "-", "-"));
        words.add(new Word(2L,"der Hund", "Pies", "-", "Zwierzęta"));
        words.add(new Word(3L,"die Katze", "Kot", "-", "-"));
        words.add(new Word(4L,"das Haus", "Dom", "-", "-"));
        return words;
    }
}
