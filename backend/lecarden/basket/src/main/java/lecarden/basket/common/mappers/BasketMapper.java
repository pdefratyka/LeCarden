package lecarden.basket.common.mappers;

import lecarden.basket.persistence.entity.Basket;
import lecarden.basket.persistence.to.BasketTO;

import java.util.List;

public interface BasketMapper {
    BasketTO mapToBasketTO(Basket basket);

    List<BasketTO> mapToBasketTOs(List<Basket> baskets);

    Basket mapToBasket(BasketTO basketTO);
}
