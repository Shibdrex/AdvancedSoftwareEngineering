package dh.aswe.assistant_core.weather_module.handler;

import org.springframework.web.client.RestClient;

public class WeatherModuleHandler {

    private static final RestClient restClient = RestClient.builder()
            .baseUrl("http://weather-module:5000")
            .defaultHeader("Auth", "corekey")
            .defaultHeader("User-Agent", "core")
            .build();

    public static String getWeather(final String args) {
        String result = restClient.get()
                .uri("/weather?ort={args}", args)
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
