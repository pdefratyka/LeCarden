package lecarden.user.persistence.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="TOKEN_ID")
    private long tokenId;

    @Column(name="CONFIRMATION_TOKEN")
    private String confirmationToken;

    @OneToOne
    @JoinColumn(nullable = false, name = "USER_ID")
    private User user;

    @Column(name="CREATED_DATE", nullable = false)
    private LocalDateTime createdDate;

    public ConfirmationToken(User user) {
        this.user = user;
        confirmationToken = UUID.randomUUID().toString();
    }

    @PrePersist
    public void createDate() {
        this.createdDate = LocalDateTime.now();
    }
}
