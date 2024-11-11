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
    private String lastname;

    @Nonnull
    private String email;

    @Nonnull
    private String password;

    private Integer age;

    @Nonnull
    private String place;

    @Nonnull
    private String[] newsTopics;

    public AssistantUser(String firstname, String lastname, String email, String password, Integer age, String place,
            String[] newsTopics) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.age = age;
        this.place = place;
        this.newsTopics = newsTopics;
    }
}
