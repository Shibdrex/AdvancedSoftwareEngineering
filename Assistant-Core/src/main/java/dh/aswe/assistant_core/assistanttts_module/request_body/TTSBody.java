package dh.aswe.assistant_core.assistanttts_module.request_body;

import lombok.Data;

@Data
public class TTSBody {
    private String inputText;
    private String voice;
    private Boolean saveAsWave;

    public TTSBody() {}

    public TTSBody(String inputText, String voice, Boolean saveAsWave) {
        this.inputText = inputText;
        this.voice = voice;
        this.saveAsWave = saveAsWave;
    }

    public TTSBody(String inputText, String voice) {
        this(inputText, voice, true);
    }
}
