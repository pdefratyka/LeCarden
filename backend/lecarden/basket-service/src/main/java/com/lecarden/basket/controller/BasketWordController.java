package com.lecarden.basket.controller;

import com.lecarden.basket.persistence.entity.BasketWord;
import com.lecarden.basket.service.BasketWordService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("user-id/{user-id}/word")
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
