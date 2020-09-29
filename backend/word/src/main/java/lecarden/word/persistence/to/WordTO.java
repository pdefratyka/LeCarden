package lecarden.word.persistence.to;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WordTO {
    private Long id;
    private String name;
    private String translation;
    private String plural;
    private String category;
    private Long userId;
    private String imageUrl;
    private String audioUrl;
    private String example;
    private Long languageId;
    private LanguageTO languageTO;
    private Boolean builtIn;
}
