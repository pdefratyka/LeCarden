package lecarden.user.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Login already exist")
public class LoginAlreadyExistsException extends UserException {
	public LoginAlreadyExistsException(String message) {
		super(message);
	}
}
