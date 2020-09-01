package lecarden.basket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lecarden.basket.persistence.entity.BasketWord;
import lecarden.basket.service.BasketWordService;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("words")
public class BasketWordController {

    private BasketWordService basketWordService;

    @Autowired
    public BasketWordController(BasketWordService basketWordService) {
        this.basketWordService = basketWordService;
    }

    @PostMapping
    public BasketWord saveBasketWord(@RequestBody BasketWord basketWord) {
        return basketWordService.saveBasketWord(basketWord);
    }

    @GetMapping
    public List<BasketWord> getBaskets() {
        return basketWordService.findAllBasketWords();
    }
}
