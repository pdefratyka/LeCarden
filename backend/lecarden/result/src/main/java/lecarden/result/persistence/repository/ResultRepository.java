package lecarden.result.persistence.repository;

import lecarden.result.persistence.constants.LearningMode;
import lecarden.result.persistence.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    Result findFirstByUserIdAndPacketIdAndLearningModeOrderByDateDesc(Long userId, Long packetId, LearningMode learningMode);

    @Query(value = "SELECT r.id, r.packet_id, r.score, r.user_id, r.learning_mode, r.date\n" +
            "FROM T_RESULT as r \n" +
            "INNER JOIN \n" +
            "(\n" +
            "    SELECT max(date) date, user_id, learning_mode, packet_id\n" +
            "    FROM T_RESULT\n" +
            "    WHERE user_id=:userId\n" +
            "    GROUP BY packet_id, learning_mode\n" +
            ") p2\n" +
            "  ON r.user_id = p2.user_id\n" +
            "  and r.date=p2.date\n" +
            "\t", nativeQuery = true)
    List<Result> getAllLastResultsFromUser(Long userId);
}
