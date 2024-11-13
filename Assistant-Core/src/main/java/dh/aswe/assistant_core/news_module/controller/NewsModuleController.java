package dh.aswe.assistant_core.news_module.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dh.aswe.assistant_core.AssistantCoreApplication;
import dh.aswe.assistant_core.news_module.handler.NewsModuleHandler;

@RestController
public class NewsModuleController {

    private static final Logger log = LoggerFactory.getLogger(AssistantCoreApplication.class);

    @GetMapping("/news-news")
    ResponseEntity<String> news(@RequestParam(name = "ressort") String param) {
        log.info("Making request to News-Service with params:\n" + param);
        String result = NewsModuleHandler.getNews(param);
        log.info("Receiving response from News-Service");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/news-check-health")
    ResponseEntity<String> checkNews() {
        String result = NewsModuleHandler.checkHealth();
        return ResponseEntity.ok(result);
    }
}