package lecarden.user.common.validator.impl;

import lecarden.user.common.exception.EmailAlreadyExistsException;
import lecarden.user.common.exception.LoginAlreadyExistsException;
import lecarden.user.common.exception.UserException;
import lecarden.user.common.validator.UserValidator;
import lecarden.user.persistence.to.UserTO;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.stereotype.Service;

@Service
public class UserValidatorImpl implements UserValidator {
    private static final int MINIMUM_LENGTH = 3;

    private static void validateUserLogin(String login) {
        if (login.length() < MINIMUM_LENGTH) {
            throw new UserException("Login is too short");
        }
    }

    private static void validateUserPassword(String password) {
        if (password.length() < MINIMUM_LENGTH) {
            throw new UserException("Password is too short");
        }
    }

    private static void validateEmail(String email) {
        if (email.length() < MINIMUM_LENGTH) {
            throw new UserException("Email is too short");
        }
        // regex would be better
        if (!email.contains("@")) {
            throw new UserException("Email muss contain @");
        }
    }

    @Override
    public void validateUser(UserTO user) {
        validateUserLogin(user.getLogin());
        validateUserPassword(user.getPassword());
        validateEmail(user.getEmail());
    }

    @Override
    public void validateDataUnique(Throwable e) {
        if (e.getCause() instanceof ConstraintViolationException) {
            String cause = e.getCause().getCause().getMessage();
            if (cause.contains("@")) {
                throw new EmailAlreadyExistsException("This email is in the database");
            } else if (cause.contains("Duplicate entry")) {
                throw new LoginAlreadyExistsException("This login is in the database");
            }
        } else {
            throw new UserException("Data is incorrect");
        }
    }
}
