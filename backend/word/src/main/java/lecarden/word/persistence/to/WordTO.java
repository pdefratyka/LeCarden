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
}
