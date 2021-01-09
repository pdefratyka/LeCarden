package com.lecarden.basket.common.mappers.impl;

import com.lecarden.basket.common.mappers.BasketMapper;
import com.lecarden.basket.persistence.entity.Basket;
import com.lecarden.basket.persistence.to.BasketTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BasketMapperImpl implements BasketMapper {

    @Override
    public BasketTO mapToBasketTO(Basket basket) {
        if (basket != null) {
            return BasketTO.builder()
                    .date(basket.getDate())
                    .id(basket.getId())
                    .number(basket.getNumber())
                    .packetId(basket.getPacketId())
                    .userId(basket.getUserId())
                    .basketWords(basket.getBasketWords())
                    .build();
        }
        return null;
    }

    @Override
    public List<BasketTO> mapToBasketTOs(List<Basket> baskets) {
        return baskets.stream().map(this::mapToBasketTO).collect(Collectors.toList());
    }

    @Override
    public Basket mapToBasket(BasketTO basketTO) {
        if (basketTO != null) {
            return Basket.builder()
                    .basketWords(basketTO.getBasketWords())
                    .userId(basketTO.getUserId())
                    .packetId(basketTO.getPacketId())
                    .date(basketTO.getDate())
                    .id(basketTO.getId())
                    .number(basketTO.getNumber())
                    .build();
        }
        return null;
    }
}
