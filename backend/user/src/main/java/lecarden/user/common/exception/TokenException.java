package lecarden.user.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Token is incorrect")
public class TokenException extends RuntimeException {
	public TokenException(String message) {
		super(message);
	}
	public TokenException() {
		super();
	}
}
