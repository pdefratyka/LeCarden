package lecarden.user.common.mapper;

import lecarden.user.persistence.entity.User;
import lecarden.user.persistence.to.UserTO;

import java.util.List;

public interface UserMapper {
    User mapToUser(UserTO userTO);

    UserTO mapToUserTO(User user);

    List<UserTO> mapToUserTos(List<User> users);
}
