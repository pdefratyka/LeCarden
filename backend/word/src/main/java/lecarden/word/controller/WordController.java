package lecarden.word.controller;

import lecarden.word.persistence.to.WordTO;
import lecarden.word.service.WordService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("words")
public class WordController {

    private WordService wordService;

    @Autowired
    public WordController(WordService wordService){
        this.wordService=wordService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    @RequestMapping("/user-id/{userId}")
    public WordTO saveWord(@RequestBody WordTO word, @PathVariable Long userId) {
        word.setUserId(userId);
        return wordService.saveWord(word);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/user-id/{userId}")
    public List<WordTO> getAllWords(@PathVariable Long userId) {
        return wordService.getWordsByUserId(userId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("categories/user-id/{userId}")
    public List<String> getAllCategoriesByUserId(@PathVariable Long userId) {
        return wordService.getAllCategoriesByUserId(userId);
    }
}
