package lecarden.word.controller;

import lecarden.word.entity.Word;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController("words")
@Log4j2
public class WordController {

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping()
    public Word saveWord(@RequestBody Word word) {
        log.info(word);
        return word;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping()
    public List<Word> getAllWords() {
        List<Word> words=new ArrayList();
        words.add(new Word("Egal","Obojętnie","-","-"));
        words.add(new Word("der Hund","Pies","-","Zwierzęta"));
        words.add(new Word("die Katze","Kot","-","-"));
        words.add(new Word("das Haus","Dom","-","-"));
        words.add(new Word("Egal","Obojętnie","-","-"));
        words.add(new Word("der Hund","Pies","-","Zwierzęta"));
        words.add(new Word("die Katze","Kot","-","-"));
        words.add(new Word("das Haus","Dom","-","-"));
        words.add(new Word("Egal","Obojętnie","-","-"));
        words.add(new Word("der Hund","Pies","-","Zwierzęta"));
        words.add(new Word("die Katze","Kot","-","-"));
        words.add(new Word("das Haus","Dom","-","-"));
        words.add(new Word("Egal","Obojętnie","-","-"));
        words.add(new Word("der Hund","Pies","-","Zwierzęta"));
        words.add(new Word("die Katze","Kot","-","-"));
        words.add(new Word("das Haus","Dom","-","-"));
        words.add(new Word("Egal","Obojętnie","-","-"));
        words.add(new Word("der Hund","Pies","-","Zwierzęta"));
        words.add(new Word("die Katze","Kot","-","-"));
        words.add(new Word("das Haus","Dom","-","-"));
        words.add(new Word("Egal","Obojętnie","-","-"));
        words.add(new Word("der Hund","Pies","-","Zwierzęta"));
        words.add(new Word("die Katze","Kot","-","-"));
        words.add(new Word("das Haus","Dom","-","-"));
        words.add(new Word("Egal","Obojętnie","-","-"));
        words.add(new Word("der Hund","Pies","-","Zwierzęta"));
        words.add(new Word("die Katze","Kot","-","-"));
        words.add(new Word("das Haus","Dom","-","-"));
        words.add(new Word("Egal","Obojętnie","-","-"));
        words.add(new Word("der Hund","Pies","-","Zwierzęta"));
        words.add(new Word("die Katze","Kot","-","-"));
        words.add(new Word("das Haus","Dom","-","-"));
        words.add(new Word("Egal","Obojętnie","-","-"));
        words.add(new Word("der Hund","Pies","-","Zwierzęta"));
        words.add(new Word("die Katze","Kot","-","-"));
        words.add(new Word("das Haus","Dom","-","-"));
        words.add(new Word("Egal","Obojętnie","-","-"));
        words.add(new Word("der Hund","Pies","-","Zwierzęta"));
        words.add(new Word("die Katze","Kot","-","-"));
        words.add(new Word("das Haus","Dom","-","-"));
        return words;
    }
}
