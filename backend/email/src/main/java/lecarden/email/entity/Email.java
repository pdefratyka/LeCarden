package lecarden.email.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Email {
    private String authorAddress;
    private String receiverAddress;
    private String topic;
    private String body;
}
