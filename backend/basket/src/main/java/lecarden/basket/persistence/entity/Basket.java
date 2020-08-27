package lecarden.basket.persistence.entity;

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
@Table(name = "T_BASKET")
public class Basket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "NUMBER")
    private Long number;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "DATE")
    private LocalDateTime date;

    @Column(name = "PACKET_ID")
    private Long packetId;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "BASKET_ID")
    private List<BasketWord> words;

    // TODO add mode
}
