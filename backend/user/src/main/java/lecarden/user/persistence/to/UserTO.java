package lecarden.user.persistence.to;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserTO {
    private Long id;
    private String password;
    private String email;
    private String login;
    private Boolean confirmed;
    private Long roleId;
}
