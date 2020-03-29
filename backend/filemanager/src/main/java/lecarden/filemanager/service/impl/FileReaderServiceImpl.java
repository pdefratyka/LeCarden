package lecarden.filemanager.service.impl;

import lecarden.filemanager.entity.Word;
import lecarden.filemanager.service.FileReaderService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileReaderServiceImpl implements FileReaderService {
    @Override
    public List<Word> loadWordsFromFile(String path, String columnsSplitter, String synonymsSplitter) {
        List<Word> words=new ArrayList<>();
        Resource resource = new ClassPathResource(path);
        BufferedReader br = null;
        try {
            br = new BufferedReader(new FileReader(resource.getFile()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();

            while (line != null) {
                Word word=new Word();
                word.setName(line.split(columnsSplitter)[0]);
                for(String s:line.split(columnsSplitter)[1].split(synonymsSplitter)){
                    if(s.charAt(0)==' '){
                        s=s.substring(1);
                    }
                    word.setTranslation(s);
                    break;
                }
                sb.append(line);
                line = br.readLine();
                words.add(word);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                br.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return words;
    }
}
