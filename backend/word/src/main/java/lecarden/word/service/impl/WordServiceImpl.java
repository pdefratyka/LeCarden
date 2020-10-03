package lecarden.word.service.impl;

import lecarden.word.common.mapper.WordMapper;
import lecarden.word.persistence.entity.Word;
import lecarden.word.persistence.repository.WordRepository;
import lecarden.word.persistence.to.PacketTO;
import lecarden.word.persistence.to.WordTO;
import lecarden.word.service.PacketService;
import lecarden.word.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Service
public class WordServiceImpl implements WordService {

    private WordRepository wordRepository;
    private WordMapper wordMapper;
    private RestTemplate restTemplate;
    private PacketService packetService;

    @Autowired
    public WordServiceImpl(WordRepository wordRepository, WordMapper wordMapper, PacketService packetService) {
        this.wordRepository = wordRepository;
        this.wordMapper = wordMapper;
        this.restTemplate = new RestTemplate();
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
    public WordTO addImageToWord(Long wordId) {
        Word word = wordRepository.findById(wordId).orElse(null);
        if (word != null && (word.getImageUrl() == null || word.getImageUrl().equals(""))) {
            word.setImageUrl(getImagesFromApi(word.getName()));
            return wordMapper.mapToWordTO(wordRepository.save(word));
        }
        return null;
    }

    @Override
    public void deleteWordById(Long wordId) {
        wordRepository.deleteById(wordId);
    }

    private String getImagesFromApi(String word) {
        word = word.replace(" ", "%20");
        String apiUrl = "https://bing-image-search1.p.rapidapi.com/images/search?q=" + word;
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-rapidapi-host", "bing-image-search1.p.rapidapi.com");
        headers.add("x-rapidapi-key", "2b9577ac48msh90ad36502d22533p130a0djsnb0b9db89f594");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        URI uri = null;
        try {
            uri = new URI(apiUrl);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        ResponseEntity<String> resultResponseEntity = restTemplate.exchange(uri, HttpMethod.GET, entity,
                String.class);
        String imageUrl = resultResponseEntity.getBody().split("contentUrl\": \"")[1].split("\"")[0];
        return imageUrl;
    }
}
