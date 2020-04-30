package lecarden.word.service.impl;

import lecarden.word.common.mapper.PacketMapper;
import lecarden.word.persistence.entity.Packet;
import lecarden.word.persistence.repository.PacketRepository;
import lecarden.word.persistence.to.PacketTO;
import lecarden.word.persistence.to.ResultTO;
import lecarden.word.persistence.to.WordResultTO;
import lecarden.word.persistence.to.WordTO;
import lecarden.word.service.PacketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class PacketServiceImpl implements PacketService {

    private PacketRepository packetRepository;
    private PacketMapper packetMapper;
    private RestTemplate restTemplate;

    @Autowired
    public PacketServiceImpl(RestTemplate restTemplate, PacketRepository packetRepository, PacketMapper packetMapper) {
        this.packetRepository = packetRepository;
        this.packetMapper = packetMapper;
        this.restTemplate = restTemplate;
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
    public PacketTO getFilteredPacketById(Long id, Long resultId) {
        PacketTO packet = packetMapper.mapToPacketTO(packetRepository.getOne(id));

        String wordUrl = "http://result-service/results/"+resultId;
        URI uri = null;
        try {
            uri = new URI(wordUrl);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        ResponseEntity<ResultTO> resultResponseEntity = restTemplate.getForEntity(uri, ResultTO.class);
        ResultTO result=resultResponseEntity.getBody();
        List<WordTO> tempArray= new ArrayList<>(packet.getWords());
        for(WordTO wordTO :tempArray){
            Optional<WordResultTO> word=result.getWordsResultsTOs().stream().filter(w->w.getWordId().equals(wordTO.getId())).findFirst();
            if(word.isPresent()){
                if(word.get().getAttempts()<2){
                    packet.getWords().remove(wordTO);
                }
            }

        }
        return packet;
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
