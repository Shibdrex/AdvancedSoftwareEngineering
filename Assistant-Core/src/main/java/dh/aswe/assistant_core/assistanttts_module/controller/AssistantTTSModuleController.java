package dh.aswe.assistant_core.assistanttts_module.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dh.aswe.assistant_core.AssistantCoreApplication;
import dh.aswe.assistant_core.assistanttts_module.handler.AssistantTTSModuleHandler;
import dh.aswe.assistant_core.assistanttts_module.request_body.TTSBody;


@RestController
public class AssistantTTSModuleController {

    private static final Logger log = LoggerFactory.getLogger(AssistantCoreApplication.class);
    
    @PostMapping("/text-to-sound-file-play")
    String textToSoundFilePlay(@RequestBody TTSBody requestBody) {
        log.info(requestBody.toString());
        String result = AssistantTTSModuleHandler.postTextToSoundFilePlay(requestBody);
        log.info(result);
        return result;
    }


}
