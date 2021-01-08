package com.lecarden.word.controller;

import com.lecarden.word.persistence.to.PacketTO;
import com.lecarden.word.service.PacketService;
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
    public PacketController(PacketService packetService) {
        this.packetService = packetService;
    }

    @GetMapping("{packetId}")
    public PacketTO getPacketById(@PathVariable Long packetId) {
        return this.packetService.getPacketById(packetId);
    }

    @GetMapping("user-id/{userId}")
    public List<PacketTO> getPacketsAccessibleForGivenUser(@PathVariable Long userId) {
        return this.packetService.getPacketsAccessibleForGivenUser(userId);
    }

    @GetMapping("{packetId}/results/{resultId}")
    public PacketTO getPacketResult(@PathVariable Long packetId, @PathVariable Long resultId) {
        return this.packetService.getPacketResult(packetId, resultId);
    }

    @PostMapping
    public PacketTO savePacket(@RequestBody PacketTO packetTO) {
        return this.packetService.savePacket(packetTO);
    }

    @DeleteMapping("{packetId}")
    public void deletePacketById(@PathVariable Long packetId) {
        this.packetService.deletePacketById(packetId);
    }

}
