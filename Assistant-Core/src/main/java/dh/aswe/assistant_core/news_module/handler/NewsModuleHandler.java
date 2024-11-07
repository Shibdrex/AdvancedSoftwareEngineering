package dh.aswe.assistant_core.news_module.handler;

import org.springframework.web.client.RestClient;

public class NewsModuleHandler {

    private static final RestClient restClient = RestClient.builder()
            .baseUrl("http://news-module:5000")
            .defaultHeader("Auth", "corekey")
            .defaultHeader("User-Agent", "core")
            .build();

    public static String getNews(final String args) {
        String result = restClient.get()
                .uri("/news?{args}", args)
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
