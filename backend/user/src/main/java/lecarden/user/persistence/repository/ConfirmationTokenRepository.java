package lecarden.user.persistence.repository;

import lecarden.user.persistence.entity.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {
    ConfirmationToken findFirstByConfirmationToken(String confirmationToken);
    ConfirmationToken findFirstByUserIdOrderByCreatedDateDesc(Long userId);
}
