package lecarden.word.service.impl;

import lecarden.word.common.mapper.WordMapper;
import lecarden.word.persistence.entity.Word;
import lecarden.word.persistence.repository.WordRepository;
import lecarden.word.persistence.to.WordTO;
import lecarden.word.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordServiceImpl implements WordService {

    private WordRepository wordRepository;
    private WordMapper wordMapper;

    @Autowired
    private WordServiceImpl(WordRepository wordRepository, WordMapper wordMapper) {
        this.wordRepository = wordRepository;
        this.wordMapper = wordMapper;
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
    public List<WordTO> saveWords(List<WordTO> words) {
        return wordMapper.mapToWordTOs(wordRepository.saveAll(wordMapper.mapToWords(words)));
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
