package dh.aswe.assistant_core.compound_actions.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dh.aswe.assistant_core.AssistantCoreApplication;
import dh.aswe.assistant_core.compound_actions.body.CompoundBody;
import dh.aswe.assistant_core.compound_actions.body.ResponseBody;
import dh.aswe.assistant_core.compound_actions.handler.CompoundActionHandler;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin
@RestController
public class CompoundActionController {

    @Autowired
    private CompoundActionHandler handler;

    private static final Logger log = LoggerFactory.getLogger(AssistantCoreApplication.class);

    @PostMapping("/setup-assistant")
    ResponseEntity<ResponseBody> setupAssistant(@RequestBody CompoundBody requestBody) {
        log.info("Making setup for Assistant with body:\n" + requestBody.toString());
        ResponseBody body = handler.postSetupAssistant(requestBody);
        log.info("Receiving responses");
        return ResponseEntity.ok(body);
    }

    @GetMapping("/morning-news")
    ResponseEntity<Resource> morningNews(@RequestParam(name = "id") Integer id, HttpServletResponse response) {
        log.info("Making request to get news");
        ResponseBody body = handler.getNewsMorning(id);
        log.info(body.getVoiceText());
        response.addCookie(new Cookie("output-text", body.getVoiceText()));
        log.info("Receiving responses");
        return ResponseEntity.ok()
        .header("Content-Type", "audio/wav")
        .body(body.getAudiofile());
    }

    @GetMapping("/classes-of-day")
    ResponseEntity<Resource> classesOfDay(@RequestParam(name = "id") Integer id, HttpServletResponse response) {
        log.info("Making request to get class times and deadlines");
        ResponseBody body = handler.getClassesOfDay(id);
        log.info(body.getVoiceText());
        response.addCookie(new Cookie("output-text", body.getVoiceText()));
        log.info("Receiving responses");
        return ResponseEntity.ok()
        .header("Content-Type", "audio/wav")
        .body(body.getAudiofile());
    }

    @GetMapping("/activity-of-day")
    ResponseEntity<Resource> activityOfDay(@RequestParam(name = "id") Integer id, HttpServletResponse response) {
        log.info("Making request to get activity of the day");
        ResponseBody body = handler.getActivityofDay(id);
        log.info(body.getVoiceText());
        response.addCookie(new Cookie("output-text", body.getVoiceText()));
        log.info("Receiving responses");
        return ResponseEntity.ok()
        .header("Content-Type", "audio/wav")
        .body(body.getAudiofile());
    }

    @PostMapping("/CRUD-via-voice")
    ResponseEntity<Resource> CRUDViaVoice(@RequestBody Resource audioFile, @RequestParam(name = "id") Integer id, HttpServletResponse response) {
        log.info("Making request to post CRUD-Command");
        ResponseBody body = handler.postCRUDCommand(audioFile, id);
        log.info(body.getVoiceText());
        response.addCookie(new Cookie("output-text", body.getVoiceText()));
        log.info("Receiving responses");
        return ResponseEntity.ok()
        .header("Content-Type", "audio/wav")
        .body(body.getAudiofile());
    }

    @PostMapping("/ask-computer")
    ResponseEntity<Resource> computerSmart(@RequestBody Resource audioFile, @RequestParam(name = "id") Integer id, HttpServletResponse response) {
        log.info("Making request to ask Smart Computer Machine God");
        ResponseBody body = handler.askGod(audioFile, id);
        log.info(body.getVoiceText());
        response.addCookie(new Cookie("output-text", body.getVoiceText()));
        log.info("Receiving responses");
        return ResponseEntity.ok()
        .header("Content-Type", "audio/wav")
        .body(body.getAudiofile());
    }
}
