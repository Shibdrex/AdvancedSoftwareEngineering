package dh.aswe.assistant_core.database.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "preference")
public class Preference {
    
    public enum Weight{
    LOW,MEDIUM,HIGH
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String topic;

    private Weight priority;

    public Preference() {}

    public Preference(String topic, Weight priority) {
        this.topic = topic;
        this.priority = priority;
    }
}
