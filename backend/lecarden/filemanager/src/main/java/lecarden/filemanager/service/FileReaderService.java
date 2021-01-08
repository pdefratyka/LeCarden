package lecarden.filemanager.service;

import lecarden.filemanager.entity.Word;

import java.util.List;

public interface FileReaderService {
    List<Word> loadWordsFromFile(String path, String columnsSplitter, String synonymsSplitter);
}
