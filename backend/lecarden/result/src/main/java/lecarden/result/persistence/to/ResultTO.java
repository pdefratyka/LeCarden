package lecarden.result.persistence.to;

import lecarden.result.persistence.constants.LearningMode;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResultTO {
    private Long id;
    private Long userId;
    private Long packetId;
    private Long score;
    private List<WordResultTO> wordsResultsTOs;
    private LocalDateTime date;
    private LearningMode learningMode;
}
