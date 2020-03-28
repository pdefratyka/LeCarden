package lecarden.word.service.impl;

import lecarden.word.common.mapper.PacketMapper;
import lecarden.word.persistence.repository.PacketRepository;
import lecarden.word.persistence.to.PacketTO;
import lecarden.word.service.PacketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacketServiceImpl implements PacketService {

    private PacketRepository packetRepository;
    private PacketMapper packetMapper;

    @Autowired
    public PacketServiceImpl(PacketRepository packetRepository, PacketMapper packetMapper){
        this.packetRepository=packetRepository;
        this.packetMapper=packetMapper;
    }

    @Override
    public PacketTO savePacket(PacketTO packetTO) {
        return packetMapper.mapToPacketTO(packetRepository.save(packetMapper.mapToPacket(packetTO)));
    }

    @Override
    public PacketTO getPacketById(Long id) {
        return packetMapper.mapToPacketTO(packetRepository.getOne(id));
    }

    @Override
    public List<PacketTO> getAllPackets() {
        return packetMapper.mapToPacketTOs(packetRepository.findAll());
    }

    @Override
    public List<PacketTO> getPacketsByUserId(Long userId) {
        return packetMapper.mapToPacketTOs(packetRepository.getPacketsByUserId(userId));
    }

    @Override
    public void deletePacketById(Long packetId) {
        this.packetRepository.deleteById(packetId);
    }
}
