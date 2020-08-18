package lecarden.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Log4j2
@RestController
@RequestMapping("baskets")
public class BasketController {

    @GetMapping
    public String start() {
        return "Hello Basket";
    }
}
