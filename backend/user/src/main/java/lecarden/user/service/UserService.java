package lecarden.user.service;

import lecarden.user.persistence.to.UserTO;

import java.util.List;

public interface UserService {
    UserTO addUser(UserTO userTO);
    UserTO getUserById(Long userId);
    List<UserTO> getAllUsers();
}
