package lecarden.filemanager.controller;

import lecarden.filemanager.entity.SavingInformation;
import lecarden.filemanager.entity.Word;
import lecarden.filemanager.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("words-from-file")
public class FileController {

    private FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping()
    public List<Word> saveWordFromFile(@RequestBody SavingInformation savingInformation) {
        return fileService.addWordsFromFile(
                savingInformation
        );
    }


}
