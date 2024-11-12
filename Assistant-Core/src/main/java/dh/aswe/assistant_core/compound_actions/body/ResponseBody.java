package dh.aswe.assistant_core.compound_actions.body;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.hateoas.EntityModel;

import dh.aswe.assistant_core.database.model.AssistantUser;
import dh.aswe.assistant_core.database.model.Deadline;
import dh.aswe.assistant_core.database.model.Preference;
import lombok.Data;

@Data
public class ResponseBody {
    private EntityModel<AssistantUser> entityUser;
    private List<EntityModel<Preference>> preferences;
    private List<EntityModel<Deadline>> deadlines;
    private String voiceText;
    private Resource audiofile;
    public ResponseBody(EntityModel<AssistantUser> entityUser, List<EntityModel<Preference>> preferences,
            List<EntityModel<Deadline>> deadlines, String voiceText) {
        this.entityUser = entityUser;
        this.preferences = preferences;
        this.deadlines = deadlines;
        this.voiceText = voiceText;
    }
    public ResponseBody(String voiceText, Resource audiofile) {
        this.voiceText = voiceText;
        this.audiofile = audiofile;
    }

    
}
