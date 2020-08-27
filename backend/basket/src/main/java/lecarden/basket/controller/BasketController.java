package lecarden.basket.controller;

import lecarden.basket.persistence.entity.Basket;
import lecarden.basket.persistence.to.BasketTO;
import lecarden.basket.service.BasketService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Log4j2
@RestController
@RequestMapping("baskets")
public class BasketController {

    private BasketService basketService;

    @Autowired
    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }

    @PostMapping
    public Basket saveBasket(@RequestBody Basket basket) {
        return basketService.saveBasket(basket);
    }

    @GetMapping
    public List<BasketTO> getBaskets(){
        return basketService.findAllBaskets();
    }

    @GetMapping("/user-id/{userId}")
    public List<BasketTO> getBasketsByUserAndPacket(@PathVariable Long userId){
        return basketService.findBasketsByUserId(userId);
    }
}
