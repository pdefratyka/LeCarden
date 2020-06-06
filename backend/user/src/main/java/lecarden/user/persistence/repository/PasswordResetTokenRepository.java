package lecarden.user.persistence.repository;

import lecarden.user.persistence.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    @Query(value = "from PasswordResetToken p where p.token=:token")
    PasswordResetToken findByToken(@Param("token") String token);
}
