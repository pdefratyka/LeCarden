package lecarden.word.persistence.to;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LanguageTO {
    private Long id;
    private String foreignLanguage;
    private String knownLanguage;
}
