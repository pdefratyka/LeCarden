package com.lecarden.word.common.mapper.impl;

import com.lecarden.word.common.mapper.PacketMapper;
import com.lecarden.word.common.mapper.WordMapper;
import com.lecarden.word.persistence.entity.Packet;
import com.lecarden.word.persistence.to.PacketTO;
import com.lecarden.word.common.mapper.LanguageMapper;
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
        if (packet != null) {
            PacketTO packetTO = PacketTO.builder()
                    .id(packet.getId())
                    .name(packet.getName())
                    .userId(packet.getUserId())
                    .builtIn(packet.getBuiltIn())
                    .languageId(packet.getLanguageId())
                    .languageTO(languageMapper.mapToLanguageTO(packet.getLanguage()))
                    .build();
            //TODO To Fix-It getting all words from packets takes too long
            if (packet.getWords() != null) {
                packetTO.setWordsNumber((long) packet.getWords().size());
            } else {
                packetTO.setWordsNumber(0L);
            }

            return packetTO;
        }

        return null;
    }

    @Override
    public List<PacketTO> mapToPacketTOs(List<Packet> packets) {
        List<PacketTO> packetTOs = new ArrayList<>();
        packets.forEach(p -> packetTOs.add(mapToPacketTO(p)));

        return packetTOs;
    }

    @Override
    public Packet mapToPacket(PacketTO packetTO) {
        if (packetTO != null) {
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

        return null;
    }
}
