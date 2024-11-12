package dh.aswe.assistant_core.database.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assistantuser",
    uniqueConstraints = 
            @UniqueConstraint(columnNames = {"email"}))
public class AssistantUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Nonnull
    private String firstname;

    @Nonnull
    private String email;

    @Nonnull
    private String place;

    @Nonnull
    private String[] newsTopics;

    public AssistantUser(String firstname, String email, String place, String[] newsTopics) {
        this.firstname = firstname;
        this.email = email;
        this.place = place;
        this.newsTopics = newsTopics;
    }
}
