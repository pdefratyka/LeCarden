package lecarden.word.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Packet {
    private Long id;
    private String name;
    private List<Word> words;
}
