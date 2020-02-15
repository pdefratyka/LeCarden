package lecarden.user.persistence.to;

import lombok.*;

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
