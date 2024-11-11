package dh.aswe.assistant_core.compound_actions.body;

import dh.aswe.assistant_core.database.model.AssistantUser;
import lombok.Data;

@Data
public class CompoundBody {
    private String alarm_time;
    private AssistantUser user;
}
