package lecarden.result.persistence.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_WORD_RESULT")
public class WordResult {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "WORD_ID")
    private Long wordId;

    @Column(name = "ATTEMPTS")
    private Long attempts;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "RESULT_ID", insertable = false, updatable = false)
    @JsonBackReference
    private Result result;

    @Column(name = "RESULT_ID")
    private Long resultId;
}
