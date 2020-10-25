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
    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping("/user-id/{userId}")
    public List<WordTO> getWordsAccessibleForGivenUser(@PathVariable Long userId,
                                                       @RequestParam("query") String query,
                                                       @RequestParam("page") int pageNo) {
        return wordService.getWordsAccessibleForGivenUser(userId, query, pageNo);
    }

    @GetMapping("categories/user-id/{userId}")
    public List<String> getCategoriesByUserId(@PathVariable Long userId) {
        return wordService.getCategoriesByUserId(userId);
    }

    @GetMapping("/packet-id/{packetId}")
    public List<WordTO> getWordsFromPacket(@PathVariable Long packetId) {
        return wordService.getWordsFromPacket(packetId);
    }

    @PostMapping
    public WordTO saveWord(@RequestBody WordTO word) {
        return wordService.saveWord(word);
    }

    @PostMapping("/list")
    public List<WordTO> saveWords(@RequestBody List<WordTO> words) {
        return wordService.saveWords(words);
    }

    @PutMapping
    public WordTO updateWord(@RequestBody WordTO word) {
        return wordService.updateWord(word);
    }

    @DeleteMapping("/{wordId}")
    public void deleteWordById(@PathVariable Long wordId) {
        wordService.deleteWordById(wordId);
    }
}
