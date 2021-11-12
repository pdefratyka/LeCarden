package com.lecarden.word.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Page number cannot be smaller than one")
public class PageNumberException extends IllegalArgumentException {
    public PageNumberException() {
        super();
    }
}
