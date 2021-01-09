package com.lecarden.basket.persistence.repository;

import java.util.List;

import com.lecarden.basket.persistence.entity.Basket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
    List<Basket> findByUserId(Long userId);

    Basket findFirstByUserIdAndPacketIdAndNumber(Long userId, Long packetId, Long number);

    List<Basket> findByUserIdAndPacketId(Long userId, Long packetId);
}
