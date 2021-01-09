package com.lecarden.basket.service.impl;

import com.lecarden.basket.persistence.to.BasketResult;
import com.lecarden.basket.persistence.to.BasketTO;
import com.lecarden.basket.persistence.to.WordResult;
import com.lecarden.basket.common.mappers.BasketMapper;
import com.lecarden.basket.persistence.entity.Basket;
import com.lecarden.basket.persistence.entity.BasketWord;
import com.lecarden.basket.persistence.repository.BasketRepository;
import com.lecarden.basket.service.BasketService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class BasketServiceImpl implements BasketService {
    private static final Long MAXIMAL_BASKET_NUMBER = 5L;
    private static final Long MINIMAL_BASKET_NUMBER = 1L;
    private BasketRepository basketRepository;
    private BasketMapper basketMapper;

    @Autowired
    public BasketServiceImpl(BasketRepository basketRepository, BasketMapper basketMapper) {
        this.basketRepository = basketRepository;
        this.basketMapper = basketMapper;
    }

    @Override
    public BasketTO saveBasket(BasketTO basketTO) {
        return basketMapper.mapToBasketTO(basketRepository.save(basketMapper.mapToBasket(basketTO)));
    }

    @Override
    public List<BasketTO> findBasketsByUserId(Long userId) {
        return basketMapper.mapToBasketTOs(basketRepository.findByUserId(userId));
    }

    @Override
    @Transactional
    public List<BasketTO> saveBasket(BasketResult basketResult) {
        BasketTO currentBasket = basketResult.getBasket();
        Basket higherBasket = getHigherBasket(currentBasket, basketResult.getIsFinalBasketMode());
        Basket lowestBasket = basketRepository.findFirstByUserIdAndPacketIdAndNumber(
                currentBasket.getUserId(), currentBasket.getPacketId(),
                MINIMAL_BASKET_NUMBER);

        for (WordResult wr : basketResult.getWordResults()) {
            if (wr.getAttempts() == 1 && currentBasket.getNumber() < MAXIMAL_BASKET_NUMBER) {
                assignWordToHigherBasket(currentBasket, higherBasket, wr);
            } else if (wr.getAttempts() != 1 && currentBasket.getNumber() > MINIMAL_BASKET_NUMBER) {
                assignWordToLowestBasket(currentBasket, lowestBasket, wr);
            }
        }

        return updateBaskets(currentBasket, lowestBasket, higherBasket);

    }

    @Override
    public void resetBaskets(Long userId, Long packetId) {
        basketRepository.deleteAll(basketRepository.findByUserIdAndPacketId(userId, packetId));
    }

    private Basket createHigherBasket(BasketTO basket, boolean isFinalBasketMode) {
        Basket tempBasket = Basket.builder()
                .number(basket.getNumber() + 1)
                .packetId(basket.getPacketId())
                .userId(basket.getUserId())
                .basketWords(new ArrayList<>())
                .build();
        if (isFinalBasketMode) {
            tempBasket.setNumber(MAXIMAL_BASKET_NUMBER);
        }
        return tempBasket;
    }

    private Basket getHigherBasket(BasketTO currentBasket, boolean isFinalBasketMode) {
        Long numberOfHigherBasket = isFinalBasketMode ? MAXIMAL_BASKET_NUMBER : currentBasket.getNumber() + 1;
        Basket higherBasket = basketRepository
                .findFirstByUserIdAndPacketIdAndNumber(currentBasket.getUserId(),
                        currentBasket.getPacketId(), numberOfHigherBasket);

        if (higherBasket == null) {
            higherBasket = createHigherBasket(currentBasket, isFinalBasketMode);
        }

        return higherBasket;
    }

    private void assignWordToHigherBasket(BasketTO currentBasket, Basket higherBasket, WordResult wr) {
        BasketWord tempBasketWord =
                currentBasket.getBasketWords().stream()
                        .filter(basketWord -> basketWord.getWordId().equals(wr.getWordId()))
                        .findFirst().orElse(null);

        if (tempBasketWord != null) {
            currentBasket.getBasketWords().remove(tempBasketWord);
            higherBasket.getBasketWords().add(BasketWord.builder().wordId(tempBasketWord.getWordId())
                    .build());
        }
    }

    private void assignWordToLowestBasket(BasketTO currentBasket, Basket lowestBasket, WordResult wr) {
        BasketWord tempBasketWord =
                currentBasket.getBasketWords().stream()
                        .filter(basketWord -> basketWord.getWordId().equals(wr.getWordId()))
                        .findFirst().orElse(null);

        if (tempBasketWord != null) {
            currentBasket.getBasketWords().remove(tempBasketWord);
            lowestBasket.getBasketWords().add(BasketWord.builder().wordId(tempBasketWord.getWordId())
                    .build());
        }
    }


    private List<BasketTO> updateBaskets(BasketTO currentBasket, Basket lowestBasket, Basket higherBasket) {
        List<BasketTO> baskets = new ArrayList<>();
        if (currentBasket.getNumber() < MAXIMAL_BASKET_NUMBER) {
            baskets.add(basketMapper.mapToBasketTO(basketRepository.save(higherBasket)));
        }

        if (lowestBasket != null) {
            baskets.add(basketMapper.mapToBasketTO(basketRepository.save(lowestBasket)));
        }

        currentBasket.setDate(LocalDateTime.now());
        baskets.add(saveBasket(currentBasket));

        return baskets;
    }
}
