package lecarden.word.persistence.repository;

import lecarden.word.persistence.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    @Query(value = "from Word w where w.userId=:userId")
    List<Word> getWordsByUserId(@Param("userId") Long userId);

    @Query(value="select distinct category from Word w where w.userId=:userId")
    List<String> getAllCategoriesByUserId(@Param("userId") Long userId);
}
