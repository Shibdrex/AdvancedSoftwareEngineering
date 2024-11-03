package dh.aswe.assistant_core.assistanttts_module.handler;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

import dh.aswe.assistant_core.assistanttts_module.request_body.TTSBody;

public class AssistantTTSModuleHandler {

    private static final RestClient restClient = RestClient.builder()
        .baseUrl("http://assistanttts-module:5000")
        .defaultHeader("Auth", "testkey")
        .defaultHeader("User-Agent", "insomnia/10.1.0")
        .build();


    public static Resource postTextToSoundFilePlay(final TTSBody body) {
      Resource result = restClient.post()
        .uri("/text-to-sound-file-play")
        .contentType(MediaType.APPLICATION_JSON)
        .body(body)
        .retrieve()
        .body(Resource.class);
        return result;
    }

    public static String postTextToSoundPlayed(final TTSBody body) {
        String result = restClient.post()
        .uri("/text-to-sound-played")
        .contentType(MediaType.APPLICATION_JSON)
        .body(body)
        .retrieve()
        .body(String.class);
        return result;
    }

    public static String postTextToSoundStreamed(final TTSBody body) {
        String result = restClient.post()
        .uri("/text-to-sound-streamed")
        .contentType(MediaType.APPLICATION_JSON)
        .body(body)
        .retrieve()
        .body(String.class);
        return result;
    }

    public static Resource postTextToSoundFile(final TTSBody body) {
        Resource result = restClient.post()
        .uri("/text-to-sound-file")
        .contentType(MediaType.APPLICATION_JSON)
        .body(body)
        .retrieve()
        .body(Resource.class);
        return result;
    }

    public static String checkTTSContainer() {
        String result = restClient.get()
        .uri("/")
        .retrieve()
        .body(String.class);
        return result;
    }
}
