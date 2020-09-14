package lecarden.basket.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lecarden.basket.persistence.entity.Basket;
import lecarden.basket.persistence.to.BasketResult;
import lecarden.basket.persistence.to.BasketTO;
import lecarden.basket.service.BasketService;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("baskets")
public class BasketController {

    private static final Logger logger = LoggerFactory.getLogger(BasketController.class);

    private BasketService basketService;

    @Autowired
    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }

    @PostMapping
    public BasketTO saveBasket(@RequestBody BasketTO basketTO) {

        return basketService.saveBasket(basketTO);
    }

    @GetMapping
    public List<BasketTO> getBaskets() {
        return basketService.findAllBaskets();
    }

    @GetMapping("/user-id/{userId}")
    public List<BasketTO> getBasketsByUserAndPacket(@PathVariable Long userId) {
        return basketService.findBasketsByUserId(userId);
    }

    @GetMapping("/user-id/{userId}/packet/{packetId}")
    public void resetBasket(@PathVariable Long userId, @PathVariable Long packetId){
        basketService.resetBaskets(userId, packetId);
    }

    @PostMapping("/update")
    public List<Basket> updateBaskets(@RequestBody BasketResult basketResult) {
        logger.info("BASKET");
        logger.info(basketResult.toString());
        return basketService.updateBaskets(basketResult);
    }
}
