package lecarden.word.persistence.to;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PacketTO {
    private Long id;
    private String name;
    private Long userId;
    private List<WordTO> words;
    private Boolean builtIn;
    private Long languageId;
    private LanguageTO languageTO;
    private Long wordsNumber;
}
