package lecarden.email.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EmailInformation {
    private String userName;
    private String userEmail;
    private String token;
}
