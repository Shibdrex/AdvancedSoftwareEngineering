package dh.aswe.assistant_core.assistantstt_module.request_body;

import lombok.Data;
import org.springframework.core.io.Resource;

@Data
public class STTBody {
    private Resource file;
    private String stop_key;

    public STTBody() {}

    public STTBody(Resource file, String stop_key) {
        this.file = file;
        this.stop_key = stop_key;
    }

    public STTBody(Resource file) {
        this(file, "p");
    }

    public STTBody(String stop_key) {
        this.stop_key = stop_key;
    }
    
}
