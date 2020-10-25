package lecarden.user.controller;

import lecarden.user.common.exception.TokenException;
import lecarden.user.common.exception.UserException;
import lecarden.user.common.validator.UserValidator;
import lecarden.user.persistence.entity.PasswordResetToken;
import lecarden.user.persistence.to.UserTO;
import lecarden.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserService userService;
    private UserValidator userValidator;

    @Autowired
    public UserController(UserService userService, UserValidator userValidator) {
        this.userService = userService;
        this.userValidator = userValidator;
    }


    @PostMapping
    public ResponseEntity<UserTO> addUser(@RequestBody UserTO userTO) {
        try {
            return ResponseEntity.ok(this.userService.addUser(userTO));
        } catch (Exception e) {
            userValidator.validateDataUnique(e);
            throw new UserException("Unknown error");
        }
    }

    @GetMapping
    public boolean confirmUser(@RequestParam("token") String token) {
        return userService.confirmUser(token);
    }

    @PostMapping("{id}/send-confirmation-email")
    public ResponseEntity sendConfirmationEmail(@PathVariable Long id) {
        try {
            userService.sendConfirmationEmail(id);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UserException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("You cannot send email now");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("There was some problem with the server. Try again later");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<PasswordResetToken> resetPassword(@RequestParam("email") String userEmail) {
        PasswordResetToken passwordResetToken = userService.createPasswordResetToken(userEmail);
        if (passwordResetToken != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(passwordResetToken);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PostMapping("change-password")
    public ResponseEntity<UserTO> changePassword(@RequestParam("token") String token, @RequestBody String password) {
        try {
            return ResponseEntity.ok(userService.updatePassword(token, password));
        } catch (TokenException e) {
            logger.error("Attempt to change password with incorrect token");
            throw new TokenException("Token is incorrect");
        }
    }
}
