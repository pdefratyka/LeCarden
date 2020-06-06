package lecarden.user.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Email already exist")
public class EmailAlreadyExistsException extends UserException {
	public EmailAlreadyExistsException(String message) {
		super(message);
	}
}
