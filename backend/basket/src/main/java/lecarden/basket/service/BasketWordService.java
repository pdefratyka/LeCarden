package lecarden.basket.service;

import lecarden.basket.persistence.entity.BasketWord;

import java.util.List;

public interface BasketWordService {
    BasketWord saveBasketWord(BasketWord basketWord);
    List<BasketWord> findAllBasketWords();
}
