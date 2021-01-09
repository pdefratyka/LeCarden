package com.lecarden.auth.service;

import com.lecarden.auth.domain.User;
import com.lecarden.auth.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private UserRepository userRepository;

	@Override
	public User getUserByLogin(String login) {
		return userRepository.findUserByLogin(login);
	}
}
