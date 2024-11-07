package dh.aswe.assistant_core.openai_module.handler;

import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

import dh.aswe.assistant_core.openai_module.request_body.OpenAIBody;

public class OpenAIHandler {

    private static final RestClient restClient = RestClient.builder()
            .baseUrl("http://openai-module:5000")
            .defaultHeader("Auth", "corekey")
            .defaultHeader("User-Agent", "core")
            .build();

    public static String postAskOpenAIQuestion(final OpenAIBody body) {
        String result = restClient.post()
                .uri("/ask-openai-question")
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(String.class);
        return result;
    }

    public static String postAskOpenAIQuestionWithHistory(final OpenAIBody body) {
        String result = restClient.post()
                .uri("/ask-openai-question-with-history")
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(String.class);
        return result;
    }

    public static String postAddMessageToOpenAIHistorySystem(final OpenAIBody body) {
        String result = restClient.post()
                .uri("/add-message-to-openai-history-system")
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(String.class);
        return result;
    }

    public static String postAddMessageToOpenAIHistoryUser(final OpenAIBody body) {
        String result = restClient.post()
                .uri("/add-message-to-openai-history-user")
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(String.class);
        return result;
    }

    public static String deleteHistoryFull() {
        String result = restClient.delete()
                .uri("/delete-history-full")
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
