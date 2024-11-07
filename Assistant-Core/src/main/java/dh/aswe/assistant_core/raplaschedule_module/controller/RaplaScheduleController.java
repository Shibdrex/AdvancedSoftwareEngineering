package dh.aswe.assistant_core.raplaschedule_module.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import dh.aswe.assistant_core.AssistantCoreApplication;
import dh.aswe.assistant_core.raplaschedule_module.handler.RaplaScheduleHandler;

@RestController
public class RaplaScheduleController {

    private static final Logger log = LoggerFactory.getLogger(AssistantCoreApplication.class);

    @GetMapping("/rapla-events-tomorrow")
    ResponseEntity<String> eventsTomorrow() {
        log.info("Making request to RaplaSchedule-Service");
        String result = RaplaScheduleHandler.getEventsTomorrow();
        log.info("Receiving response from RaplaSchedule-Service");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/rapla-check-health")
    ResponseEntity<String> checkRapla() {
        String result = RaplaScheduleHandler.checkHealth();
        return ResponseEntity.ok(result);
    }
}
