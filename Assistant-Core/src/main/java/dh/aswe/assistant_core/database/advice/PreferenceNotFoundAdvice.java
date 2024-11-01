package dh.aswe.assistant_core.database.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import dh.aswe.assistant_core.database.exception.PreferenceNotFoundException;

@RestControllerAdvice
public class PreferenceNotFoundAdvice {

    @ExceptionHandler(PreferenceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String preferenceNotFoundHandler(PreferenceNotFoundException ex) {
        return ex.getMessage();
    }
}
