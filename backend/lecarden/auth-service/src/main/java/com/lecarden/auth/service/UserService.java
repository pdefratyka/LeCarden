package com.lecarden.auth.service;

import com.lecarden.auth.domain.User;

public interface UserService {
    User getUserByLogin(String login);
}
