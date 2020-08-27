package lecarden.basket.service;

import lecarden.basket.persistence.entity.Basket;
import lecarden.basket.persistence.to.BasketTO;

import java.util.List;

public interface BasketService {
    Basket saveBasket(Basket basket);
    List<BasketTO> findAllBaskets();
    List<BasketTO> findBasketsByUserId(Long userIdLong);
}
