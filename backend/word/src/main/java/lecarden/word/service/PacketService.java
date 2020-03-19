package lecarden.word.service;

import lecarden.word.persistence.to.PacketTO;

import java.util.List;

public interface PacketService {
    PacketTO savePacket(PacketTO packetTO);

    PacketTO getPacketById(Long id);

    List<PacketTO> getAllPackets();

    List<PacketTO> getPacketsByUserId(Long userId);
}
