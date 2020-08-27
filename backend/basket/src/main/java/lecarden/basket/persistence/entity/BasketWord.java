package lecarden.basket.persistence.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_BASKET_WORD")
public class BasketWord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(name = "WORD_ID")
    Long wordId;

    @Column(name="BASKET_ID")
    Long basketId;

}
