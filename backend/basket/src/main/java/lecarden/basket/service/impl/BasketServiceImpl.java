package lecarden.basket.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lecarden.basket.common.mappers.BasketMapper;
import lecarden.basket.persistence.entity.Basket;
import lecarden.basket.persistence.entity.BasketWord;
import lecarden.basket.persistence.repository.BasketRepository;
import lecarden.basket.persistence.to.BasketResult;
import lecarden.basket.persistence.to.BasketTO;
import lecarden.basket.persistence.to.WordResult;
import lecarden.basket.service.BasketService;

@Service
public class BasketServiceImpl implements BasketService {

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
    public List<BasketTO> findAllBaskets() {
        return basketMapper.mapToBasketTOs(basketRepository.findAll());
    }

    @Override
    public List<BasketTO> findBasketsByUserId(Long userId) {
        return basketMapper.mapToBasketTOs(basketRepository.findByUserId(userId));
    }

    @Override
    @Transactional
    public List<Basket> updateBaskets(BasketResult basketResult) {
        Long numberOfHigherBasket = basketResult.getIsFinalBasketMode().booleanValue() ? 5L : basketResult.getBasket().getNumber() + 1;

        Basket higherBasket = basketRepository
                .findFirstByUserIdAndPacketIdAndNumber(basketResult.getBasket().getUserId(),
                        basketResult.getBasket().getPacketId(), numberOfHigherBasket);
        basketResult.getBasket().setDate(LocalDateTime.now());
        //saveBasket(basketResult.getBasket());

        if (higherBasket == null) {
            higherBasket = Basket.builder()
                    .number(basketResult.getBasket().getNumber() + 1)
                    .packetId(basketResult.getBasket().getPacketId())
                    .userId(basketResult.getBasket().getUserId())
                    .basketWords(new ArrayList<>())
                    .build();
            if (basketResult.getIsFinalBasketMode()) {
                higherBasket.setNumber(5L);
            }
        }
        Basket lowerBasket = basketRepository.findFirstByUserIdAndPacketIdAndNumber(
                basketResult.getBasket().getUserId(), basketResult.getBasket().getPacketId(),
                1L);

        for (WordResult wr : basketResult.getWordResults()) {
            if (wr.getAttempts() == 1 && basketResult.getBasket().getNumber() < 5) {
                BasketWord tempBasketWord =
                        basketResult.getBasket().getBasketWords().stream()
                                .filter(basketWord -> basketWord.getWordId().equals(wr.getWordId()))
                                .findFirst().orElse(null);

                if (tempBasketWord != null) {
                    basketResult.getBasket().getBasketWords().remove(tempBasketWord);
                    higherBasket.getBasketWords().add(BasketWord.builder().wordId(tempBasketWord.getWordId())
                            .build());
                }
            }
            else if (basketResult.getBasket().getNumber() > 1 && wr.getAttempts() != 1) {
                BasketWord tempBasketWord =
                        basketResult.getBasket().getBasketWords().stream()
                                .filter(basketWord -> basketWord.getWordId().equals(wr.getWordId()))
                                .findFirst().orElse(null);

                if (tempBasketWord != null) {
                    basketResult.getBasket().getBasketWords().remove(tempBasketWord);
                    lowerBasket.getBasketWords().add(BasketWord.builder().wordId(tempBasketWord.getWordId())
                            .build());
                }
            }
        }
        saveBasket(basketResult.getBasket());
        if (basketResult.getBasket().getNumber() < 5) {
            basketRepository.save(higherBasket);
        }

        if (lowerBasket != null) {
            basketRepository.save(lowerBasket);
        }

        return null;
    }

    @Override
    public void resetBaskets(Long userId, Long packetId) {
        basketRepository.deleteAll(basketRepository.findByUserIdAndPacketId(userId, packetId));
    }
}
