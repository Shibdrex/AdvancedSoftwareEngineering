package dh.aswe.assistant_core.assistantstt_module.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import dh.aswe.assistant_core.AssistantCoreApplication;
import dh.aswe.assistant_core.assistantstt_module.handler.AssistantSTTModuleHandler;
import dh.aswe.assistant_core.assistantstt_module.request_body.STTBody;

public class AssistantSTTModuleController {

    private static final Logger log = LoggerFactory.getLogger(AssistantCoreApplication.class);

    @GetMapping("/stt-to-text-mic")
    ResponseEntity<String> speechToTextMic() {
        log.info("Making request to STT-Service");
        String result = AssistantSTTModuleHandler.getSpeechToTextMic();
        log.info("Receiving response from STT-Service");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/stt-to-text-mic-continuous")
    ResponseEntity<String> speechToTextMicContinuous(@RequestBody STTBody requestBody) {
        log.info("Making request to STT-Service with body:\n" + requestBody.toString());
        String result = AssistantSTTModuleHandler.getSpeechToTextMicContinuous(requestBody);
        log.info("Receiving response from STT-Service");
        return ResponseEntity.ok(result);
    }

    @PostMapping("/stt-to-text-file")
    ResponseEntity<String> speechToTextFile(@RequestBody STTBody requestBody) {
        log.info("Making request to STT-Service with body:\n" + requestBody.toString());
        String result = AssistantSTTModuleHandler.postSpeechToTextFile(requestBody);
        log.info("Receiving response from STT-Service");
        return ResponseEntity.ok(result);
    }

    @PostMapping("/stt-to-text-file-continuous")
    ResponseEntity<String> speechToTextFileContinuous(@RequestBody STTBody requestBody) {
        log.info("Making request to STT-Service with body:\n" + requestBody.toString());
        String result = AssistantSTTModuleHandler.postSpeechToTextFileContinuous(requestBody);
        log.info("Receiving response from STT-Service");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/stt-check-health")
    ResponseEntity<String> checkSTT() {
        String result = AssistantSTTModuleHandler.checkHealth();
        return ResponseEntity.ok(result);
    }
}
