package com.lecarden.basket.persistence.to;

import com.lecarden.basket.persistence.entity.BasketWord;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BasketTO {

    private Long id;
    private Long number;
    private Long userId;
    private LocalDateTime date;
    private Long packetId;
    private List<BasketWord> basketWords;

}
