package lecarden.user.service.impl;

import lecarden.user.UserApplication;
import lecarden.user.common.exception.UserException;
import lecarden.user.persistence.to.UserTO;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = UserApplication.class)
@Sql("/data/role.sql")
public class UserServiceImplTest {
    @Autowired
    private UserServiceImpl userService;

    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    @Test
    public void shouldSaveUser(){
        // given && when
        UserTO result = userService.addUser(createUserTO());

        // then
        assertThat(result, notNullValue());
    }

    @Test
    public void shouldThrowExceptionCauseWrongEmail(){
        // given
        UserTO userTO=createUserTO();
        userTO.setEmail("wrongEmail");

        // expected
        exceptionRule.expect(UserException.class);
        exceptionRule.expectMessage("Email muss contain @");

        // when
        userService.addUser(userTO);
    }

    private UserTO createUserTO() {
        return UserTO.builder()
                .roleId(1L)
                .login("Login")
                .password("Password")
                .email("email@email.pl")
                .confirmed(true)
                .build();
    }
}
