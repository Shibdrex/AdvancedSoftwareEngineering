package dh.aswe.assistant_core.assistanttts_module.handler;

import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestClient;

import dh.aswe.assistant_core.assistanttts_module.request_body.TTSBody;

public class AssistantTTSModuleHandler {

    private static final RestClient restClient = RestClient.builder()
        .messageConverters(converters -> converters.add(new MappingJackson2HttpMessageConverter()))
        .baseUrl("http://assistanttts-module:1000")
        .defaultHeader("Auth", "")
        .defaultHeader("User-Agent", "")
        .build();

    public static String postTextToSoundFilePlay(TTSBody body) {
      Object result = restClient.post()
        .uri("/text-to-sound-file-play")
        .contentType(MediaType.APPLICATION_JSON)
        .body(body)
        .exchange((request, response) -> {
            if (response.getStatusCode().is4xxClientError()) {
                throw new RuntimeException();
            } else {
                return response;
            }
        });
        return (String) result;

    }
}
