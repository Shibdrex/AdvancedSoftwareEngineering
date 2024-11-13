package dh.aswe.assistant_core.openai_module.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dh.aswe.assistant_core.AssistantCoreApplication;
import dh.aswe.assistant_core.openai_module.handler.OpenAIHandler;
import dh.aswe.assistant_core.openai_module.request_body.OpenAIBody;

@CrossOrigin
@RestController
public class OpenAIController {

    private static final Logger log = LoggerFactory.getLogger(AssistantCoreApplication.class);

    @PostMapping("/openai-ask")
    ResponseEntity<String> askOpenAIQuestion(@RequestBody OpenAIBody requestBody) {
        log.info("Making request to OpenAI-Service with body:\n" + requestBody.toString());
        String result = OpenAIHandler.postAskOpenAIQuestion(requestBody);
        log.info("Receiving response from OpenAI-Service");
        return ResponseEntity.ok(result);
    }

    @PostMapping("/openai-ask-history")
    ResponseEntity<String> askOpenAIQuestionWithHistory(@RequestBody OpenAIBody requestBody) {
        log.info("Making request to OpenAI-Service with body:\n" + requestBody.toString());
        String result = OpenAIHandler.postAskOpenAIQuestionWithHistory(requestBody);
        log.info("Receiving response from OpenAI-Service");
        return ResponseEntity.ok(result);
    }

    @PostMapping("/openai-add-message-system")
    ResponseEntity<String> addMessageToOpenAIHistorySystem(@RequestBody OpenAIBody requestBody) {
        log.info("Making request to OpenAI-Service with body:\n" + requestBody.toString());
        String result = OpenAIHandler.postAddMessageToOpenAIHistorySystem(requestBody);
        log.info("Receiving response from OpenAI-Service");
        return ResponseEntity.ok(result);
    }

    @PostMapping("/openai-add-message-user")
    ResponseEntity<String> addMessageToOpenAIHistoryUser(@RequestBody OpenAIBody requestBody) {
        log.info("Making request to OpenAI-Service with body:\n" + requestBody.toString());
        String result = OpenAIHandler.postAddMessageToOpenAIHistoryUser(requestBody);
        log.info("Receiving response from OpenAI-Service");
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/openai-delete-history")
    ResponseEntity<String> deleteHistoryFull() {
        log.info("Making request to OpenAI-Service to delete history");
        String result = OpenAIHandler.deleteHistoryFull();
        log.info("Receiving response from OpenAI-Service");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/openai-check-health")
    ResponseEntity<String> checkOpenAI() {
        String result = OpenAIHandler.checkHealth();
        return ResponseEntity.ok(result);
    }
}
