package com.lecarden.basket.service.impl;

import com.lecarden.basket.persistence.entity.BasketWord;
import com.lecarden.basket.persistence.repository.BasketWordRepository;
import com.lecarden.basket.service.BasketWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BasketWordServiceImpl implements BasketWordService {

    private BasketWordRepository basketWordRepository;

    @Autowired
    public BasketWordServiceImpl(BasketWordRepository basketWordRepository) {
        this.basketWordRepository = basketWordRepository;
    }

    @Override
    public BasketWord saveBasketWord(BasketWord basketWord) {
        return basketWordRepository.save(basketWord);
    }

    @Override
    public List<BasketWord> findAllBasketWords() {
        return basketWordRepository.findAll();
    }
}
