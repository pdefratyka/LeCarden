package com.lecarden.word.controller;

import com.lecarden.word.persistence.to.WordTO;
import com.lecarden.word.service.WordService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/words")
@Slf4j
public class WordController {

    private WordService wordService;

    @Autowired
    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping("/user-id/{userId}")
    public ResponseEntity<List<WordTO>> getWordsAccessibleForGivenUser(@PathVariable Long userId,
                                                                       @RequestParam("query") String query,
                                                                       @RequestParam("page") int pageNo) {
        log.info("Get words for user with id:{}, query:{}, pageNo:{}", userId, query, pageNo);
        return new ResponseEntity<>(wordService.getWordsAccessibleForGivenUser(userId, query, pageNo), HttpStatus.OK);
    }

    @GetMapping("/user-id/{userId}/categories")
    public ResponseEntity<List<String>> getCategoriesByUserId(@PathVariable Long userId) {
        log.info("Get categories for user with id:{}", userId);
        return new ResponseEntity<>(wordService.getCategoriesByUserId(userId), HttpStatus.OK);
    }

    @GetMapping("packet-id/{packetId}")
    public ResponseEntity<List<WordTO>> getWordsFromPacket(@PathVariable Long packetId) {
        log.info("Get words from packet for packet with id:{}", packetId);
        return new ResponseEntity<>(wordService.getWordsFromPacket(packetId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<WordTO> saveWord(@RequestBody WordTO word) {
        log.info("Save word:{}", word);
        return new ResponseEntity<>(wordService.saveWord(word), HttpStatus.OK);
    }

    @PostMapping("list")
    public ResponseEntity<List<WordTO>> saveWords(@RequestBody List<WordTO> words) {
        log.info("Save words:{}", words);
        return new ResponseEntity<>(wordService.saveWords(words), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<WordTO> updateWord(@RequestBody WordTO word) {
        log.info("Update word:{}", word);
        return new ResponseEntity<>(wordService.updateWord(word), HttpStatus.OK);
    }

    @DeleteMapping("{wordId}")
    public void deleteWordById(@PathVariable Long wordId) {
        log.info("Delete word with id:{}", wordId);
        wordService.deleteWordById(wordId);
    }
}
