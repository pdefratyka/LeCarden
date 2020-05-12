package lecarden.user.controller;

import lecarden.user.common.exception.UserException;
import lecarden.user.persistence.to.UserTO;
import lecarden.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
        try{
            return this.userService.addUser(userTO);
        }
        catch(Exception e){
            throw new UserException();
        }
    }
}
