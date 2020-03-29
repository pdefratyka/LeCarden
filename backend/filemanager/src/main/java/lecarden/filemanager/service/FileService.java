package lecarden.filemanager.service;

import lecarden.filemanager.entity.Word;

import java.util.List;

public interface FileService {
    List<Word> addWordsFromFile(String path, String category, Long userId);
}
