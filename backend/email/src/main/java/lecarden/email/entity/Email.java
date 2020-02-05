package lecarden.email.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Email {
    private String receiverAddress;
    private String topic;
    private String body;
}
