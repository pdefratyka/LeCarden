package com.lecarden.basket.controller;

import com.lecarden.basket.persistence.to.BasketResult;
import com.lecarden.basket.persistence.to.BasketTO;
import com.lecarden.basket.service.BasketService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("user-id/{userId}/baskets")
public class BasketController {

    private BasketService basketService;

    @Autowired
    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }


    @GetMapping
    public List<BasketTO> getBasketsByUser(@PathVariable Long userId) {
        return basketService.findBasketsByUserId(userId);
    }

    @GetMapping("packet/{packetId}/reset")
    public void resetBasket(@PathVariable Long userId, @PathVariable Long packetId) {
        basketService.resetBaskets(userId, packetId);
    }

    @PostMapping
    public List<BasketTO> saveBasket(@PathVariable Long userId, @RequestBody BasketResult basketResult) {
        basketResult.getBasket().setUserId(userId);
        return basketService.saveBasket(basketResult);
    }
}
