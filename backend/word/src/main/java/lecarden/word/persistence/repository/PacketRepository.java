package lecarden.word.persistence.repository;

import lecarden.word.persistence.entity.Packet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacketRepository extends JpaRepository<Packet, Long> {
    @Query(value = "from Packet p where p.userId=:userId")
    List<Packet> getPacketsByUserId(@Param("userId") Long userId);
}
