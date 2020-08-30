package lecarden.basket.controller;

import lecarden.basket.persistence.entity.Basket;
import lecarden.basket.persistence.to.BasketResult;
import lecarden.basket.persistence.to.BasketTO;
import lecarden.basket.service.BasketService;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @PostMapping("/update")
    public List<Basket> updateBaskets(@RequestBody BasketResult basketResult) {
        logger.info("BASKET");
        logger.info(basketResult.toString());
        return basketService.updateBaskets(basketResult);
    }
}
