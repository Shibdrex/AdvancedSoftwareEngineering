package dh.aswe.assistant_core.weather_module.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dh.aswe.assistant_core.AssistantCoreApplication;
import dh.aswe.assistant_core.weather_module.handler.WeatherModuleHandler;

@RestController
public class WeatherModuleController {

    private static final Logger log = LoggerFactory.getLogger(AssistantCoreApplication.class);

    @GetMapping("/weather-weather")
    ResponseEntity<String> weather(@RequestParam(name = "ort") String param) {
        log.info("Making request to Weather-Service with params:\n" + param);
        String result = WeatherModuleHandler.getWeather(param);
        log.info("Receiving response from Weather-Service");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/weather-check-health")
    ResponseEntity<String> checkWeather() {
        String result = WeatherModuleHandler.checkHealth();
        return ResponseEntity.ok(result);
    }
}
