package lecarden.word.common.mapper.impl;

import lecarden.word.common.mapper.LanguageMapper;
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
    private LanguageMapper languageMapper;

    @Autowired
    public PacketMapperImpl(WordMapper wordMapper, LanguageMapper languageMapper) {
        this.wordMapper = wordMapper;
        this.languageMapper = languageMapper;
    }

    @Override
    public PacketTO mapToPacketTO(Packet packet) {
        PacketTO packetTO = PacketTO.builder()
                .id(packet.getId())
                .name(packet.getName())
                .userId(packet.getUserId())
                //,.words(wordMapper.mapToWordTOs(packet.getWords()))
                .builtIn(packet.getBuiltIn())
                .languageId(packet.getLanguageId())
                .languageTO(languageMapper.mapToLanguageTO(packet.getLanguage()))
                .build();
        if(packet.getWords()!=null){
            packetTO.setWordsNumber(Long.parseLong(String.valueOf(packet.getWords().size())));
        }
        else{
            packetTO.setWordsNumber(0L);
        }
        return packetTO;
    }

    @Override
    public List<PacketTO> mapToPacketTOs(List<Packet> packets) {
        List<PacketTO> packetTOs = new ArrayList<>();

        for (Packet packet : packets) {
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
                .builtIn(packetTO.getBuiltIn())
                .language(languageMapper.mapToLanguage(packetTO.getLanguageTO()))
                .languageId(packetTO.getLanguageId())
                .build();
    }
}
