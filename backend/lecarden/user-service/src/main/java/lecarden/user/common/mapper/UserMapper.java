package lecarden.user.common.mapper;

import lecarden.user.persistence.entity.User;
import lecarden.user.persistence.to.UserTO;

public interface UserMapper {
	User mapToUser(UserTO userTO);

	UserTO mapToUserTO(User user);
}
