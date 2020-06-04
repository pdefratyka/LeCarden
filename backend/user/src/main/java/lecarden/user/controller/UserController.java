package lecarden.user.controller;

import lecarden.user.common.exception.UserException;
import lecarden.user.persistence.entity.PasswordResetToken;
import lecarden.user.persistence.to.UserTO;
import lecarden.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserTO addUser(@RequestBody UserTO userTO) {
        try {
            return this.userService.addUser(userTO);
        } catch (Exception e) {
            throw new UserException();
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
            return ResponseEntity.
                    status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("There was some problem with the server. Try again later");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity resetPassword(@RequestParam("email") String userEmail) {
        PasswordResetToken passwordResetToken = userService.createPasswordResetToken(userEmail);
        if (passwordResetToken != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(passwordResetToken);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PostMapping("change-password")
    public ResponseEntity changePassword(@RequestParam("token") String token, @RequestBody String password) {
        // Find user by token
        userService.updatePassword(token, password);
        // Update password
        return null;
    }
}
