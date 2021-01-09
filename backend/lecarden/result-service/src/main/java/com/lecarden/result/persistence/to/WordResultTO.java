package com.lecarden.result.persistence.to;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WordResultTO {
    private Long id;
    private Long wordId;
    private Long attempts;
    private Long resultId;
}
