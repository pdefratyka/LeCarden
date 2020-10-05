package lecarden.word.persistence.repository;

import lecarden.word.persistence.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    @Query(value = "from Word w where w.userId=:userId or w.builtIn=true")
    List<Word> getWordsByUserId(@Param("userId") Long userId);

    @Query(value = "from Word w where (w.userId=:userId or w.builtIn=true) and (w.name like %:query% or w" +
            ".translation" +
            " " +
            "like %:query%)")
    Page<Word> getWordsByUserId(@Param("userId") Long userId, @Param("query") String query, Pageable pageable);

    @Query(value = "select distinct category from Word w where w.userId=:userId")
    List<String> getAllCategoriesByUserId(@Param("userId") Long userId);
}
