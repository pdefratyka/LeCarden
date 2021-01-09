package com.lecarden.basket.common.mappers;

import com.lecarden.basket.persistence.entity.Basket;
import com.lecarden.basket.persistence.to.BasketTO;

import java.util.List;

public interface BasketMapper {
    BasketTO mapToBasketTO(Basket basket);

    List<BasketTO> mapToBasketTOs(List<Basket> baskets);

    Basket mapToBasket(BasketTO basketTO);
}
