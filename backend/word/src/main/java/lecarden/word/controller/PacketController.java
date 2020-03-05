package lecarden.word.controller;
import lecarden.word.entity.Packet;
import lecarden.word.entity.Word;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("packets")
public class PacketController {

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<Packet> getAllPackets() {
        List<Packet> packets = new ArrayList();
        List<Word> words = new ArrayList();
        words.add(new Word(1L,"Egal", "Obojętnie", "-", "-"));
        words.add(new Word(2L,"der Hund", "Pies", "-", "Zwierzęta"));
        words.add(new Word(3L,"die Katze", "Kot", "-", "-"));
        words.add(new Word(4L,"das Haus", "Dom", "-", "-"));

        packets.add(new Packet(1L,"Tier",words));
        packets.add(new Packet(2L,"Lands",words));
        packets.add(new Packet(3L,"House",words));

        return packets;
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public Packet getPacketById(@PathVariable String id) {
        System.out.println("Packet by id");
        List<Packet> packets = new ArrayList();
        List<Word> words = new ArrayList();
        words.add(new Word(1L,"Egal", "Obojętnie", "-", "-"));
        words.add(new Word(2L,"der Hund", "Pies", "-", "Zwierzęta"));
        words.add(new Word(3L,"die Katze", "Kot", "-", "-"));
        words.add(new Word(4L,"das Haus", "Dom", "-", "-"));

        packets.add(new Packet(1L,"Tier",words));
        packets.add(new Packet(2L,"Lands",words));
        packets.add(new Packet(3L,"House",words));

        return packets.get(0);
    }

}
