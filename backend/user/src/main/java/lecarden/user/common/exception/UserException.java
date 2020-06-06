package lecarden.user.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Data is incorrect")
public class UserException extends RuntimeException {
	public UserException(String message) {
		super(message);
	}
	public UserException() {
		super();
	}
}
