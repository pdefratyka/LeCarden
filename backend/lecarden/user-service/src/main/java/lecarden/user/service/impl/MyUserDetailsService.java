package lecarden.user.service.impl;
/*
import lecarden.user.persistence.to.UserTO;
import lecarden.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private UserService userService;

    @Autowired
    public MyUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String login) {
        UserTO userTO = userService.getUserByLogin(login);
        return new User(userTO.getLogin(), userTO.getPassword(), new ArrayList<>());
    }
}
*/