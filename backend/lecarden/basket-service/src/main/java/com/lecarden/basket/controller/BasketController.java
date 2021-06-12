package com.lecarden.basket.controller;

import com.lecarden.basket.persistence.to.BasketResult;
import com.lecarden.basket.persistence.to.BasketTO;
import com.lecarden.basket.service.BasketService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@RestController
@RequestMapping("baskets")
public class BasketController {

    private BasketService basketService;

    @Autowired
    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }


    @GetMapping("user-id/{userId}")
    @ResponseBody()
    public List<BasketTO> getBasketsByUser(@PathVariable Long userId) {
        return basketService.findBasketsByUserId(userId);
    }

    @GetMapping("user-id/{userId}/packets/{packetId}/reset")
    public void resetBasket(@PathVariable Long userId, @PathVariable Long packetId) {
        Map<String, Integer> response=new HashMap<>();
        basketService.resetBaskets(userId, packetId);
    }

    @PostMapping
    public List<BasketTO> saveBasket(@RequestBody BasketResult basketResult) {
        return basketService.saveBasket(basketResult);
    }
}
