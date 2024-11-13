package dh.aswe.assistant_core.assistanttts_module.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dh.aswe.assistant_core.AssistantCoreApplication;
import dh.aswe.assistant_core.assistanttts_module.handler.AssistantTTSModuleHandler;
import dh.aswe.assistant_core.assistanttts_module.request_body.TTSBody;

@CrossOrigin
@RestController
public class AssistantTTSModuleController {

    private static final Logger log = LoggerFactory.getLogger(AssistantCoreApplication.class);

    @PostMapping("/tts-file-play")
    ResponseEntity<Resource> textToSoundFilePlay(@RequestBody TTSBody requestBody) {
        log.info("Making request to TTS-Service with body:\n" + requestBody.toString());
        Resource result = AssistantTTSModuleHandler.postTextToSoundFilePlay(requestBody);
        log.info("Receiving response from TTS-Service");
        return ResponseEntity.ok()
                .header("Content-Type", "audio/wav")
                .body(result);
    }

    @PostMapping("/tts-played")
    ResponseEntity<String> textToSoundPlayed(@RequestBody TTSBody requestBody) {
        log.info("Making request to TTS-Service with body:\n" + requestBody.toString());
        String result = AssistantTTSModuleHandler.postTextToSoundPlayed(requestBody);
        log.info("Receiving response from TTS-Service");
        return ResponseEntity.ok(result);
    }

    @PostMapping("/tts-streamed")
    ResponseEntity<String> textToSoundStreamed(@RequestBody TTSBody requestBody) {
        log.info("Making request to TTS-Service with body:\n" + requestBody.toString());
        String result = AssistantTTSModuleHandler.postTextToSoundStreamed(requestBody);
        log.info("Receiving response from TTS-Service");
        return ResponseEntity.ok(result);
    }

    @PostMapping("/tts-file")
    ResponseEntity<Resource> textToSoundFile(@RequestBody TTSBody requestBody) {
        log.info("Making request to TTS-Service with body:\n" + requestBody.toString());
        Resource result = AssistantTTSModuleHandler.postTextToSoundFile(requestBody);
        log.info("Receiving response from TTS-Service");
        return ResponseEntity.ok()
                .header("Content-Type", "audio/wav")
                .header("attachment", "TTS_Message.wav")
                .body(result);
    }

    @GetMapping("/tts-check-health")
    ResponseEntity<String> checkTTS() {
        String result = AssistantTTSModuleHandler.checkHealth();
        return ResponseEntity.ok(result);
    }
}
