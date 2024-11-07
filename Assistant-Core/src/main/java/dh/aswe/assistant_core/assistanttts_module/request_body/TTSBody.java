package dh.aswe.assistant_core.assistanttts_module.request_body;

import lombok.Data;

@Data
public class TTSBody {
    private String input_text;
    private String voice;
    private Boolean save_as_wave;

    public TTSBody() {
    }

    public TTSBody(String input_text, String voice, Boolean save_as_wave) {
        this.input_text = input_text;
        this.voice = voice;
        this.save_as_wave = save_as_wave;
    }

    public TTSBody(String input_text, String voice) {
        this(input_text, voice, true);
    }
}
