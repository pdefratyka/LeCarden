package com.lecarden.auth.domain;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Singular;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@EqualsAndHashCode(callSuper = false)
public class AuthUser extends User {

    private Long userId;

    @Builder(builderMethodName = "with")
    public AuthUser(final String username, final String password, @Singular final Collection<?
            extends GrantedAuthority> authorities, final Long userId) {
        super(username, password, authorities);
        this.userId = userId;
    }

    public Long getUserId() {
        return this.userId;
    }
}
