package lecarden.user.persistence.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "LOGIN", nullable = false, length = 50, unique = true)
    private String login;

    @Column(name = "PASSWORD", nullable = false, length = 250)
    private String password;

    //@Column(name = "EMAIL", nullable = true, length = 50, unique = true)
    @Column(name = "EMAIL", length = 50)
    private String email;

    @ManyToOne
    @JoinColumn(name = "ROLE_ID", insertable = false, updatable = false)
    private Role role;

    @Column(name = "ROLE_ID")
    private Long roleId;

    @Column(name = "CONFIRMED")
    private Boolean confirmed;

    @Column(name = "CREATE_DATE", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "UPDATE_DATE", nullable = false)
    private LocalDateTime updateDate;

    @PrePersist
    public void createDate() {
        this.createDate = LocalDateTime.now();
        this.updateDate = createDate;
    }

    @PreUpdate
    public void updateDate() {
        this.updateDate = LocalDateTime.now();
    }
}
