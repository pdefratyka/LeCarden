package lecarden.filemanager.service;

import lecarden.filemanager.entity.SavingInformation;
import lecarden.filemanager.entity.Word;

import java.util.List;

public interface FileService {
    List<Word> addWordsFromFile(SavingInformation savingInformation);
}
