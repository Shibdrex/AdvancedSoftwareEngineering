package dh.aswe.assistant_core.alarmclock_module.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dh.aswe.assistant_core.AssistantCoreApplication;
import dh.aswe.assistant_core.alarmclock_module.handler.AlarmclockModuleHandler;
import dh.aswe.assistant_core.alarmclock_module.request_body.AlarmBody;

@RestController
public class AlarmclockModuleController {

    private static final Logger log = LoggerFactory.getLogger(AssistantCoreApplication.class);

    @PostMapping("/alarm-set")
    ResponseEntity<String> setAlarm(@RequestBody AlarmBody requestBody) {
        log.info("Making request to Alarmclock-Service with body:\n" + requestBody.toString());
        String result = AlarmclockModuleHandler.postSetAlarm(requestBody);
        log.info("Receiving response from Alarmclock-Service");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/alarm-time-until-alarm")
    ResponseEntity<String> timeUntilAlarm() {
        log.info("Making request to Alarmclock-Service");
        String result = AlarmclockModuleHandler.getTimeUntilAlarm();
        log.info("Receiving response from Alarmclock-Service");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/alarm-is-alarm-time")
    ResponseEntity<String> isAlarmTime() {
        log.info("Making request to Alarmclock-Service");
        String result = AlarmclockModuleHandler.getIsAlarmTime();
        log.info("Receiving response from Alarmclock-Service");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/alarm-check-health")
    ResponseEntity<String> checkAlarmclock() {
        String result = AlarmclockModuleHandler.checkHealth();
        return ResponseEntity.ok(result);
    }
}
