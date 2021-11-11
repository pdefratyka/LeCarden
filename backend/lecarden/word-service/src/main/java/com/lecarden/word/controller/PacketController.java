package com.lecarden.word.controller;

import com.lecarden.word.persistence.to.PacketTO;
import com.lecarden.word.service.PacketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("packets")
@Slf4j
public class PacketController {

    private PacketService packetService;

    @Autowired
    public PacketController(PacketService packetService) {
        this.packetService = packetService;
    }

    @GetMapping("{packetId}")
    public ResponseEntity<PacketTO> getPacketById(@PathVariable Long packetId) {
        log.info("Get packet with id:{}", packetId);
        return new ResponseEntity<>(this.packetService.getPacketById(packetId), HttpStatus.OK);
    }

    @GetMapping("user-id/{userId}")
    public ResponseEntity<List<PacketTO>> getPacketsAccessibleForGivenUser(@PathVariable Long userId) {
        log.info("Get packets for user with id:{}", userId);
        return new ResponseEntity<>(this.packetService.getPacketsAccessibleForGivenUser(userId), HttpStatus.OK);
    }

    @GetMapping("{packetId}/results/{resultId}")
    public ResponseEntity<PacketTO> getPacketResult(@PathVariable Long packetId, @PathVariable Long resultId) {
        log.info("Get packets result with packet id:{}, result id:{}", packetId, resultId);
        return new ResponseEntity<>(this.packetService.getPacketResult(packetId, resultId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PacketTO> savePacket(@RequestBody PacketTO packetTO) {
        log.info("Save packet: {}", packetTO);
        return new ResponseEntity<>(this.packetService.savePacket(packetTO), HttpStatus.OK);
    }

    @DeleteMapping("{packetId}")
    public void deletePacketById(@PathVariable Long packetId) {
        log.info("Delete packet with id: {}", packetId);
        this.packetService.deletePacketById(packetId);
    }

}
