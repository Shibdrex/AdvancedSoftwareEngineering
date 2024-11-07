package dh.aswe.assistant_core.raplaschedule_module.handler;

import org.springframework.web.client.RestClient;

public class RaplaScheduleHandler {

    private static final RestClient restClient = RestClient.builder()
            .baseUrl("http://raplaschedule-module:5000")
            .defaultHeader("Auth", "corekey")
            .defaultHeader("User-Agent", "core")
            .build();

    public static String getEventsTomorrow() {
        String result = restClient.get()
                .uri("/events/tomorrow")
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
