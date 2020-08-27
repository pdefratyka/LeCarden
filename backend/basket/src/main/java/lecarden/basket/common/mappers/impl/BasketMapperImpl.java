package lecarden.basket.common.mappers.impl;

import lecarden.basket.common.mappers.BasketMapper;
import lecarden.basket.persistence.entity.Basket;
import lecarden.basket.persistence.entity.BasketWord;
import lecarden.basket.persistence.to.BasketTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BasketMapperImpl implements BasketMapper {

    @Override
    public BasketTO mapToBasketTO(Basket basket) {
        return BasketTO.builder()
                .date(basket.getDate())
                .id(basket.getId())
                .number(basket.getNumber())
                .packetId(basket.getPacketId())
                .userId(basket.getUserId())
                .words(basket.getWords().stream().map(BasketWord::getWordId).collect(Collectors.toList()))
                .build();
    }

    @Override
    public List<BasketTO> mapToBasketTOs(List<Basket> baskets) {
        return baskets.stream().map(this::mapToBasketTO).collect(Collectors.toList());
    }
}
