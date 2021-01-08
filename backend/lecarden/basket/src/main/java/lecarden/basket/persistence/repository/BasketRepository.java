package lecarden.basket.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lecarden.basket.persistence.entity.Basket;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
    List<Basket> findByUserId(Long userId);

    Basket findFirstByUserIdAndPacketIdAndNumber(Long userId, Long packetId, Long number);

    List<Basket> findByUserIdAndPacketId(Long userId, Long packetId);
}
