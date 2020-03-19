package lecarden.word.common.mapper.impl;

import lecarden.word.common.mapper.PacketMapper;
import lecarden.word.common.mapper.WordMapper;
import lecarden.word.persistence.entity.Packet;
import lecarden.word.persistence.to.PacketTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PacketMapperImpl implements PacketMapper {

    private WordMapper wordMapper;

    @Autowired
    public PacketMapperImpl(WordMapper wordMapper){
        this.wordMapper=wordMapper;
    }

    @Override
    public PacketTO mapToPacketTO(Packet packet) {
        return PacketTO.builder()
                .id(packet.getId())
                .name(packet.getName())
                .userId(packet.getUserId())
                .words(wordMapper.mapToWordTOs(packet.getWords()))
                .build();
    }

    @Override
    public List<PacketTO> mapToPacketTOs(List<Packet> packets) {
        List<PacketTO> packetTOs=new ArrayList<>();

        for(Packet packet:packets){
            packetTOs.add(mapToPacketTO(packet));
        }

        return packetTOs;
    }

    @Override
    public Packet mapToPacket(PacketTO packetTO) {
        return Packet.builder()
                .id(packetTO.getId())
                .name(packetTO.getName())
                .userId(packetTO.getUserId())
                .words(wordMapper.mapToWords(packetTO.getWords()))
                .build();
    }
}
