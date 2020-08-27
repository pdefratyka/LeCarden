package lecarden.basket.persistence.repository;

import lecarden.basket.persistence.entity.BasketWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketWordRepository extends JpaRepository<BasketWord, Long> {
}
