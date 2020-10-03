package lecarden.filemanager.entity;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Word {
    String name;
    String translation;
    String plural;
    String category;
    Long userId;
    Boolean builtIn;
    Long languageId;
}
