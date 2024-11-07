package dh.aswe.assistant_core.assistantstt_module.handler;

import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

import dh.aswe.assistant_core.assistantstt_module.request_body.STTBody;

public class AssistantSTTModuleHandler {

    private static final RestClient restClient = RestClient.builder()
            .baseUrl("http://assistantstt-module:5000")
            .defaultHeader("Auth", "corekey")
            .defaultHeader("User-Agent", "core")
            .build();

    public static String getSpeechToTextMic() {
        String result = restClient.get()
                .uri("/speech-to-text-mic")
                .retrieve()
                .body(String.class);
        return result;
    }

    public static String getSpeechToTextMicContinuous(final STTBody body) {
        String result = restClient.method(HttpMethod.GET)
                .uri("/speech-to-text-mic-continuous")
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(String.class);
        return result;
    }

    public static String postSpeechToTextFile(final STTBody body) {
        String result = restClient.post()
                .uri("/speech-to-text-file")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .body(String.class);
        return result;
    }

    public static String postSpeechToTextFileContinuous(final STTBody body) {
        String result = restClient.post()
                .uri("/speech-to-text-file-continuous")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(body)
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
