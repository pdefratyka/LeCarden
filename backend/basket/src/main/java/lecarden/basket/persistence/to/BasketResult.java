package lecarden.basket.persistence.to;


import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BasketResult {
    private BasketTO basket;
    private WordResult[] wordResults;
    private Boolean isFinalBasketMode;
}
