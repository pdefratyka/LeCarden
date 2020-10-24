package lecarden.word.persistence.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_LANGUAGE")
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "FOREIGN_LANGUAGE", nullable = false, length = 50)
    private String foreignLanguage;

    @Column(name = "KNOWN_LANGUAGE", nullable = false, length = 50)
    private String knownLanguage;
}
