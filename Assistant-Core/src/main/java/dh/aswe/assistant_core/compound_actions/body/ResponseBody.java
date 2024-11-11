package dh.aswe.assistant_core.compound_actions.body;

import org.springframework.core.io.Resource;
import org.springframework.hateoas.EntityModel;

import dh.aswe.assistant_core.database.model.Preference;
import lombok.Data;

@Data
public class ResponseBody {
    private EntityModel<Preference> preference;
    private Resource audioFile;
    private String message;
    
    public ResponseBody(EntityModel<Preference> preference, Resource audioFile, String message) {
        this.preference = preference;
        this.audioFile = audioFile;
        this.message = message;
    }

    public ResponseBody(EntityModel<Preference> preference, Resource audioFile) {
        this.preference = preference;
        this.audioFile = audioFile;
    }

    public ResponseBody(EntityModel<Preference> preference, String message) {
        this.preference = preference;
        this.message = message;
    }

    public ResponseBody(Resource audioFile, String message) {
        this.audioFile = audioFile;
        this.message = message;
    }

    public ResponseBody(EntityModel<Preference> preference) {
        this.preference = preference;
    }

    public ResponseBody(Resource audioFile) {
        this.audioFile = audioFile;
    }

    public ResponseBody(String message) {
        this.message = message;
    }
}
