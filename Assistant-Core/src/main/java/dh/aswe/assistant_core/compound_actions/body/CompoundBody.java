package dh.aswe.assistant_core.compound_actions.body;

import dh.aswe.assistant_core.database.model.AssistantUser;
import dh.aswe.assistant_core.database.model.Deadline;
import dh.aswe.assistant_core.database.model.Preference;
import lombok.Data;

@Data
public class CompoundBody {
    private String alarm_time;
    private AssistantUser user;
    private Preference[] preferences;
    private Deadline[] deadlines;
}
