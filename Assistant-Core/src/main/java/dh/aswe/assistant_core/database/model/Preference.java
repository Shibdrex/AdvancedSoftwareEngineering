package dh.aswe.assistant_core.database.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "preference")
public class Preference {
    
    public enum Weight{
    LOW,MEDIUM,HIGH
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Nonnull
    private Weight priority;

    @Nonnull
    private String name;

    @ManyToOne
    private AssistantUser user;

    public Preference(Weight priority, String name, AssistantUser user) {
        this.priority = priority;
        this.name = name;
        this.user = user;
    }
}
