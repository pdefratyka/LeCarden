package lecarden.user.persistence.to;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserTO {
    private Long id;
    private String password;
    private String email;
    private String login;
    private Boolean confirmed;
    private Long roleId;
}
