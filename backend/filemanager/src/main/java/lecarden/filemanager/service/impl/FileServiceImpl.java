package lecarden.filemanager.service.impl;

import lecarden.filemanager.entity.SavingInformation;
import lecarden.filemanager.entity.Word;
import lecarden.filemanager.service.FileReaderService;
import lecarden.filemanager.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class FileServiceImpl implements FileService {

    private RestTemplate restTemplate;
    private FileReaderService fileReaderService;

    @Autowired
    public FileServiceImpl(RestTemplate restTemplate, FileReaderService fileReaderService) {
        this.restTemplate = restTemplate;
        this.fileReaderService = fileReaderService;
    }

    @Override
    public List<Word> addWordsFromFile(SavingInformation savingInformation) {
        List<Word> words = fileReaderService.
                loadWordsFromFile(savingInformation.getPath(), "=", ",");
        words.forEach(w -> {
            w.setCategory(savingInformation.getCategory());
            w.setUserId(savingInformation.getUserId());
            w.setBuiltIn(savingInformation.getBuiltIn());
            w.setLanguageId(savingInformation.getLanguageId());
        });

        return saveWord(words);
    }

    private List<Word> saveWord(List<Word> words) {
        // TODO Null pointer
        String wordUrl = "http://word-service/words/list" + words.get(0).getUserId();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<Word>> requestEntity = new HttpEntity<>(words, headers);
        return restTemplate.exchange(wordUrl, HttpMethod.POST, requestEntity,
                new ParameterizedTypeReference<List<Word>>() {
                }).getBody();
    }
}
