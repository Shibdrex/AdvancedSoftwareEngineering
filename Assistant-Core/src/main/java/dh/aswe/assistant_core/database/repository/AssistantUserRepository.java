package dh.aswe.assistant_core.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dh.aswe.assistant_core.database.model.AssistantUser;

public interface AssistantUserRepository extends JpaRepository<AssistantUser, Integer> {
    List<AssistantUser> findByEmail(String email);

    List<AssistantUser> findByFirstnameContaining(String firstname);
}
