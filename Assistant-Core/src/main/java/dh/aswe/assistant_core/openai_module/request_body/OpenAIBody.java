package dh.aswe.assistant_core.openai_module.request_body;

import lombok.Data;

@Data
public class OpenAIBody {
    private String prompt;

    public OpenAIBody() {
    }

    public OpenAIBody(String prompt) {
        this.prompt = prompt;
    }
}
