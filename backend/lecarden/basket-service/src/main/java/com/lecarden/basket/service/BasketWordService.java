package com.lecarden.basket.service;

import com.lecarden.basket.persistence.entity.BasketWord;

import java.util.List;

public interface BasketWordService {
    BasketWord saveBasketWord(BasketWord basketWord);

    List<BasketWord> findAllBasketWords();
}
