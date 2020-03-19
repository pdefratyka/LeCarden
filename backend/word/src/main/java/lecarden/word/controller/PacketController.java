package lecarden.word.controller;
import lecarden.word.persistence.to.PacketTO;
import lecarden.word.service.PacketService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("packets")
public class PacketController {

    private PacketService packetService;

    @Autowired
    public PacketController(PacketService packetService){
        this.packetService=packetService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public PacketTO savePacket(@RequestBody PacketTO packetTO){
        return this.packetService.savePacket(packetTO);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/user-id/{id}")
    public List<PacketTO> getAllPackets(@PathVariable Long id) {
        return this.packetService.getPacketsByUserId(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public PacketTO getPacketById(@PathVariable Long id) {

        return this.packetService.getPacketById(id);
    }

}
