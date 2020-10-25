package lecarden.user.common.mapper.impl;

import lecarden.user.common.mapper.UserMapper;
import lecarden.user.persistence.entity.User;
import lecarden.user.persistence.to.UserTO;
import org.springframework.stereotype.Service;

@Service
public class UserMapperImpl implements UserMapper {

    @Override
    public User mapToUser(UserTO userTO) {
        if (userTO != null) {
            return User.builder()
                    .confirmed(userTO.getConfirmed())
                    .id(userTO.getId())
                    .email(userTO.getEmail())
                    .login(userTO.getLogin())
                    .password(userTO.getPassword())
                    .roleId(userTO.getRoleId())
                    .build();
        }
        return null;
    }

    @Override
    public UserTO mapToUserTO(User user) {
        if (user != null) {
            return UserTO.builder()
                    .confirmed(user.getConfirmed())
                    .email(user.getEmail())
                    .login(user.getLogin())
                    .password(user.getPassword())
                    .roleId(user.getRoleId())
                    .id(user.getId())
                    .build();
        }
        return null;
    }
}
