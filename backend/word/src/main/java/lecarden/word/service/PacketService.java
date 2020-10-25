package lecarden.word.service;

import lecarden.word.persistence.to.PacketTO;

import java.util.List;

public interface PacketService {
    PacketTO savePacket(PacketTO packetTO);

    PacketTO getPacketById(Long id);

    PacketTO getPacketResult(Long id, Long resultId);

    List<PacketTO> getPacketsAccessibleForGivenUser(Long userId);

    void deletePacketById(Long packetId);
}
