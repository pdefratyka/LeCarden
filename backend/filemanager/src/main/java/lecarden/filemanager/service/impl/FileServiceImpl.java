package lecarden.filemanager.service.impl;

import lecarden.filemanager.entity.Word;
import lecarden.filemanager.service.FileReaderService;
import lecarden.filemanager.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class FileServiceImpl implements FileService {

    private RestTemplate restTemplate;
    private FileReaderService fileReaderService;

    @Autowired
    public FileServiceImpl(RestTemplate restTemplate, FileReaderService fileReaderService){
        this.restTemplate=restTemplate;
        this.fileReaderService=fileReaderService;
    }

    @Override
    public List<Word> addWordsFromFile(String path, String category, Long userId) {
        List<Word> words = fileReaderService.loadWordsFromFile(path,"=",",");
        words.forEach(w->{
            w.setCategory(category);
            w.setUserId(userId);
        });

        return saveWord(words,userId);
    }

    private List<Word> saveWord(List<Word> words, Long userId) {
        String wordUrl = "http://word-service/words/list/user-id/"+userId;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<Word>> requestEntity = new HttpEntity<>(words, headers);
        return restTemplate.exchange(wordUrl, HttpMethod.POST, requestEntity,
                new ParameterizedTypeReference<List<Word>>() {}).getBody();
    }
}
