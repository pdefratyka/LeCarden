package lecarden.user.persistence.repository;

import lecarden.user.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "from User u where u.login=:login")
    User findUserByLogin(@Param("login") String login);
}
