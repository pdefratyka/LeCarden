package com.lecarden.basket.service;

import com.lecarden.basket.persistence.to.BasketResult;
import com.lecarden.basket.persistence.to.BasketTO;

import java.util.List;

public interface BasketService {
    BasketTO saveBasket(BasketTO basketTO);

    List<BasketTO> findBasketsByUserId(Long userIdLong);

    List<BasketTO> saveBasket(BasketResult basketResult);

    void resetBaskets(Long userId, Long packetId);
}
