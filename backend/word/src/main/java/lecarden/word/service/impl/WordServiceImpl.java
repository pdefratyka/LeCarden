package lecarden.word.service.impl;

import lecarden.word.common.mapper.WordMapper;
import lecarden.word.persistence.entity.Word;
import lecarden.word.persistence.repository.WordRepository;
import lecarden.word.persistence.to.PacketTO;
import lecarden.word.persistence.to.WordTO;
import lecarden.word.service.PacketService;
import lecarden.word.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WordServiceImpl implements WordService {

    private WordRepository wordRepository;
    private WordMapper wordMapper;
    private PacketService packetService;

    @Autowired
    public WordServiceImpl(WordRepository wordRepository, WordMapper wordMapper, PacketService packetService) {
        this.wordRepository = wordRepository;
        this.wordMapper = wordMapper;
        this.packetService = packetService;
    }

    @Override
    public WordTO saveWord(WordTO word) {
        return wordMapper.mapToWordTO(wordRepository.save(wordMapper.mapToWord(word)));
    }

    @Override
    public WordTO updateWord(WordTO wordTO) {
        /*Word word=wordRepository.findById(wordId).orElse(null);
        if(word!=null){
            word.setName(name);
            wordRepository.save(word);
        }*/

        return wordMapper.mapToWordTO(wordRepository.save(wordMapper.mapToWord(wordTO)));
    }

    @Override
    public WordTO getWordById(Long wordId) {
        return wordMapper.mapToWordTO(wordRepository.findById(wordId).orElse(new Word()));
    }


    @Override
    @Transactional
    public List<WordTO> saveWords(List<WordTO> words) {

        List<WordTO> wordTOS = wordMapper.mapToWordTOs(wordRepository.saveAll(wordMapper.mapToWords(words)));
        if (words.get(0).getBuiltIn()) {
            WordTO tempWord = wordTOS.get(0);
            packetService.savePacket(
                    PacketTO.builder()
                            .words(wordTOS)
                            .userId(tempWord.getId())
                            .userId(tempWord.getUserId())
                            .builtIn(tempWord.getBuiltIn())
                            .name(tempWord.getCategory())
                            .build()
            );
        }
        return wordTOS;
    }

    @Override
    public List<WordTO> getWordsByUserId(Long userId) {
        return wordMapper.mapToWordTOs(wordRepository.getWordsByUserId(userId));
    }

    @Override
    public List<String> getAllCategoriesByUserId(Long userId) {
        return wordRepository.getAllCategoriesByUserId(userId);
    }

    @Override
    public void deleteWordById(Long wordId) {
        wordRepository.deleteById(wordId);
    }
}
