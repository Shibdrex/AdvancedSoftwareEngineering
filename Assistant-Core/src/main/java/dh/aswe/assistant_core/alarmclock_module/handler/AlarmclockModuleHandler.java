package dh.aswe.assistant_core.alarmclock_module.handler;

import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

import dh.aswe.assistant_core.alarmclock_module.request_body.AlarmBody;

public class AlarmclockModuleHandler {

    private static final RestClient restClient = RestClient.builder()
            .baseUrl("http://alarmclock-module:5000")
            .defaultHeader("Auth", "corekey")
            .defaultHeader("User-Agent", "core")
            .build();

    public static String postSetAlarm(final AlarmBody body) {
        String result = restClient.post()
                .uri("/set-alarm")
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(String.class);
        return result;
    }

    public static String getTimeUntilAlarm() {
        String result = restClient.get()
                .uri("/time-until-alarm")
                .retrieve()
                .body(String.class);
        return result;
    }

    public static String getIsAlarmTime() {
        String result = restClient.get()
                .uri("/is-alarm-time")
                .retrieve()
                .body(String.class);
        return result;
    }

    public static String checkHealth() {
        String result = restClient.get()
                .uri("/")
                .retrieve()
                .body(String.class);
        return result;
    }
}
