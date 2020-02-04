package lecarden.user.common.validator;

import lecarden.user.persistence.to.UserTO;

public interface UserValidator {
    void validateUser(UserTO user);
    void validateDataUnique(Throwable e);
}
