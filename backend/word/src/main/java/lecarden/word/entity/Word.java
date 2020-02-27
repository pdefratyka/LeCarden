package lecarden.word.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Word {
    private Long id;
    private String name;
    private String translation;
    private String plural;
    private String category;
    private Long userId;
}
