package lecarden.result.persistence.repository;

import lecarden.result.persistence.entity.WordResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordResultRepository extends JpaRepository<WordResult, Long> {
}
