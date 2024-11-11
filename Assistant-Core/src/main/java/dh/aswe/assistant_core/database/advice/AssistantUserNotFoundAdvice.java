package dh.aswe.assistant_core.database.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import dh.aswe.assistant_core.database.exception.AssistantUserNotFoundException;

@RestControllerAdvice
public class AssistantUserNotFoundAdvice {

    @ExceptionHandler(AssistantUserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String assistantUserNotFoundHandler(AssistantUserNotFoundException ex) {
        return ex.getMessage();
    }
}
