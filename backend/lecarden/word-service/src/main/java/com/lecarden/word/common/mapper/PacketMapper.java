package com.lecarden.word.common.mapper;

import com.lecarden.word.persistence.entity.Packet;
import com.lecarden.word.persistence.to.PacketTO;

import java.util.List;

public interface PacketMapper {
    PacketTO mapToPacketTO(Packet packet);

    List<PacketTO> mapToPacketTOs(List<Packet> packets);

    Packet mapToPacket(PacketTO packetTO);
}
