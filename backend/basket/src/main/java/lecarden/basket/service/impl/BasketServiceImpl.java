package lecarden.basket.service.impl;

import lecarden.basket.common.mappers.BasketMapper;
import lecarden.basket.persistence.entity.Basket;
import lecarden.basket.persistence.repository.BasketRepository;
import lecarden.basket.persistence.to.BasketTO;
import lecarden.basket.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public Basket saveBasket(Basket basket) {
        return basketRepository.save(basket);
    }

    @Override
    public List<BasketTO> findAllBaskets() {
        return basketMapper.mapToBasketTOs(basketRepository.findAll());
    }

    @Override
    public List<BasketTO> findBasketsByUserId(Long userId) {
        return basketMapper.mapToBasketTOs(basketRepository.findByUserId(userId));
    }
}
