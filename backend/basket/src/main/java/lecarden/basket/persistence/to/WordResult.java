package lecarden.basket.persistence.to;

import lecarden.basket.persistence.entity.BasketWord;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WordResult {
    private Long wordId;
    private Long attempts;
}
