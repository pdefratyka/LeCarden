package lecarden.word.controller;

import lecarden.word.persistence.to.WordTO;
import lecarden.word.service.PacketService;
import lecarden.word.service.WordService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("words")
public class WordController {
    // TODO Clear this class
    private WordService wordService;
    private PacketService packetService;

    @Autowired
    public WordController(WordService wordService, PacketService packetService) {
        this.wordService = wordService;
        this.packetService = packetService;
    }

    //@CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    @RequestMapping("/user-id/{userId}")
    public WordTO saveWord(@RequestBody WordTO word, @PathVariable Long userId) {
        word.setUserId(userId);
        return wordService.saveWord(word);
    }

    @PutMapping
    public WordTO updateWord(@RequestBody WordTO word) {
        return wordService.updateWord(word);
    }

    @GetMapping("/{wordId}/image-update")
    public WordTO addImageToWord(@PathVariable Long wordId) {
        return wordService.addImageToWord(wordId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    @RequestMapping("/list/user-id/{userId}")
    public List<WordTO> saveWordsList(@RequestBody List<WordTO> words, @PathVariable Long userId) {
        words.forEach(w -> w.setUserId(userId));
        return wordService.saveWords(words);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{wordId}")
    public WordTO getWordById(@PathVariable Long wordId) {
        return wordService.getWordById(wordId);
    }

    @DeleteMapping("/{wordId}")
    public void deleteWordById(@PathVariable Long wordId) {
        wordService.deleteWordById(wordId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/user-id/{userId}")
    public List<WordTO> getAllWords(@PathVariable Long userId,
                                    @RequestParam("query") String query, @RequestParam("page") int pageNo) {
        return wordService.getAllWordByUserIdAndPageNo(userId, query, pageNo);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/packet-id/{packetId}")
    public List<WordTO> getAllWordsFromPacket(@PathVariable Long packetId) {
        return packetService.getWordsFromPacket(packetId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("categories/user-id/{userId}")
    public List<String> getAllCategoriesByUserId(@PathVariable Long userId) {
        return wordService.getAllCategoriesByUserId(userId);
    }
}
