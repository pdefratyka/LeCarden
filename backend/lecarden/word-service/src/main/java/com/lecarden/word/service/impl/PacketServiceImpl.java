package com.lecarden.word.service.impl;

import com.lecarden.word.common.mapper.PacketMapper;
import com.lecarden.word.config.EnvironmentService;
import com.lecarden.word.persistence.repository.PacketRepository;
import com.lecarden.word.persistence.to.PacketTO;
import com.lecarden.word.persistence.to.ResultTO;
import com.lecarden.word.persistence.to.WordResultTO;
import com.lecarden.word.service.PacketService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class PacketServiceImpl implements PacketService {

    private PacketRepository packetRepository;
    private PacketMapper packetMapper;
    private RestTemplate restTemplate;
    private EnvironmentService environmentService;

    @Autowired
    public PacketServiceImpl(RestTemplate restTemplate, PacketRepository packetRepository,
                             PacketMapper packetMapper, EnvironmentService environmentService) {
        this.packetRepository = packetRepository;
        this.packetMapper = packetMapper;
        this.restTemplate = restTemplate;
        this.environmentService = environmentService;
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
    public PacketTO getPacketResult(Long id, Long resultId) {
        PacketTO packet = packetMapper.mapToPacketTO(packetRepository.getOne(id));
        ResultTO result = getResultById(resultId);
        return getFilteredPacketFromWords(packet, result);
    }

    @Override
    public List<PacketTO> getPacketsAccessibleForGivenUser(Long userId) {
        return packetMapper.mapToPacketTOs(packetRepository.getPacketsAccessibleForGivenUser(userId));
    }

    @Override
    public void deletePacketById(Long packetId) {
        this.packetRepository.deleteById(packetId);
    }

    private ResultTO getResultById(Long resultId) {
        String resultServiceUrl = environmentService.getResultUrl() + resultId;
        try {
            URI uri = new URI(resultServiceUrl);
            ResponseEntity<ResultTO> resultResponseEntity = restTemplate.getForEntity(uri, ResultTO.class);
            return resultResponseEntity.getBody();
        } catch (URISyntaxException e) {
            log.error(e.getMessage());
        }
        return null;
    }

    private PacketTO getFilteredPacketFromWords(PacketTO packet, ResultTO result) {
        packet.getWords().forEach(wordTO -> {
            Optional<WordResultTO> word = result.getWordsResultsTOs()
                    .stream()
                    .filter(w -> w.getWordId().equals(wordTO.getId()))
                    .findFirst();
            if (word.isPresent()) {
                if (word.get().getAttempts() < 2) {
                    packet.getWords().remove(wordTO);
                }
            } else {
                packet.getWords().remove(wordTO);
            }
        });
        return packet;
    }
}
