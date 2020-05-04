package lecarden.word.persistence.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_WORD")
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "NAME", nullable = false, length = 50)
    private String name;
    @Column(name = "TRANSLATION", nullable = false, length = 50)
    private String translation;
    @Column(name = "PLURAL", length = 50)
    private String plural;
    @Column(name = "CATEGORY", length = 50)
    private String category;
    @Column(name="USER_ID")
    private Long userId;
    @Column(name="IMAGE_URL")
    private String imageUrl;

    @ManyToMany(mappedBy = "words")
    private List<Packet> packets;

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
