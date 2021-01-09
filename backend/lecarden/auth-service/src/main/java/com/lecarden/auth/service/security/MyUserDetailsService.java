package com.lecarden.auth.service.security;

import com.lecarden.auth.domain.AuthUser;
import com.lecarden.auth.domain.User;
import com.lecarden.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
		User user = userService.getUserByLogin(login);

		return new AuthUser(user.getUsername(),user.getPassword(),new ArrayList<>(),user.getId());
	}
}
