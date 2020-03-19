package lecarden.word.persistence.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_PACKET")
public class Packet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "NAME", nullable = false, length = 50)
    private String name;

    @Column(name="USER_ID")
    private Long userId;

    @ManyToMany(cascade = { CascadeType.MERGE })// Merge is considered as a dirty solution
    @JoinTable(
            name = "PACKET_WORD",
            joinColumns = { @JoinColumn(name = "PACKET_ID") },
            inverseJoinColumns = { @JoinColumn(name = "WORD_ID") }
    )
    private List<Word> words;

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;

    @Column(name = "UPDATE_DATE")
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
