package dh.aswe.assistant_core.alarmclock_module.request_body;

import lombok.Data;

@Data
public class AlarmBody {
    private String alarm_time;

    public AlarmBody() {}

    public AlarmBody(String alarm_time) {
        this.alarm_time = alarm_time;
    }
}
