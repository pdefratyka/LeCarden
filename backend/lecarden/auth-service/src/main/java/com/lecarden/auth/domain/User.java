package com.lecarden.auth.domain;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_USER")
public class User implements UserDetails{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "LOGIN", nullable = false, length = 50, unique = true)
	private String login;

	@Column(name = "PASSWORD", nullable = false, length = 250)
	private String password;

	@Column(name = "EMAIL", nullable = false, length = 50, unique = true)
	private String email;

	@Column(name = "ROLE_ID")
	private Long roleId;

	@Column(name = "CONFIRMED")
	private Boolean confirmed;

	@Column(name = "CREATE_DATE", nullable = false)
	private LocalDateTime createDate;

	@Column(name = "UPDATE_DATE", nullable = false)
	private LocalDateTime updateDate;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getUsername() {
		return this.login;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
