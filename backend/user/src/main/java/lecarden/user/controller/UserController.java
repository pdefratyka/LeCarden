package lecarden.user.controller;

import lecarden.user.service.UserService;
import lecarden.user.persistence.to.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping("{id}")
    public UserTO getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @GetMapping
    public List<UserTO> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping
    public UserTO addUser(@RequestBody UserTO userTO){
        return this.userService.addUser(userTO);
    }
}
