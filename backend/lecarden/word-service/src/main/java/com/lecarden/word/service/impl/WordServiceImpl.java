package com.lecarden.word.service.impl;

import com.lecarden.word.common.mapper.WordMapper;
import com.lecarden.word.persistence.entity.Word;
import com.lecarden.word.persistence.repository.PacketRepository;
import com.lecarden.word.persistence.repository.WordRepository;
import com.lecarden.word.persistence.to.PacketTO;
import com.lecarden.word.persistence.to.WordTO;
import com.lecarden.word.service.PacketService;
import com.lecarden.word.service.WordService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j2
@Service
public class WordServiceImpl implements WordService {
    private static final int PAGE_SIZE = 100;

    private WordRepository wordRepository;
    private WordMapper wordMapper;
    private PacketService packetService;
    private PacketRepository packetRepository;

    @Autowired
    public WordServiceImpl(WordRepository wordRepository, WordMapper wordMapper,
                           PacketService packetService, PacketRepository packetRepository) {
        this.wordRepository = wordRepository;
        this.wordMapper = wordMapper;
        this.packetService = packetService;
        this.packetRepository = packetRepository;
    }

    @Override
    public WordTO saveWord(WordTO word) {
        return wordMapper.mapToWordTO(wordRepository.save(wordMapper.mapToWord(word)));
    }

    @Override
    public WordTO updateWord(WordTO wordTO) {
        return wordMapper.mapToWordTO(wordRepository.save(wordMapper.mapToWord(wordTO)));
    }

    @Override
    @Transactional
    public List<WordTO> saveWords(List<WordTO> words) {
        List<WordTO> wordTOS = wordMapper
                .mapToWordTOs(wordRepository.saveAll(wordMapper.mapToWords(words)));
        packetService.savePacket(builtPacketFromWords(words));
        return wordTOS;
    }

    @Override
    public List<String> getCategoriesByUserId(Long userId) {
        return wordRepository.getCategoriesByUserId(userId);
    }

    @Override
    public List<WordTO> getWordsAccessibleForGivenUser(Long userId, String query, int pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, PAGE_SIZE);
        Page<Word> words = wordRepository.getWordsAccessibleForGivenUser(userId, query, pageable);
        return wordMapper.mapToWordTOs(words.getContent());
    }

    @Override
    public List<WordTO> getWordsFromPacket(Long packetId) {
        return wordMapper.mapToWordTOs(packetRepository.getOne(packetId).getWords());
    }

    @Override
    public void deleteWordById(Long wordId) {
        wordRepository.deleteById(wordId);
    }

    private PacketTO builtPacketFromWords(List<WordTO> words) {
        if (!words.isEmpty()) {
            WordTO tempWord = words.get(0);
            return PacketTO.builder()
                    .words(words)
                    .userId(tempWord.getUserId())
                    .builtIn(tempWord.getBuiltIn())
                    .name(tempWord.getCategory())
                    .languageId(tempWord.getLanguageId())
                    .build();
        }
        return null;
    }
}
