package dh.aswe.assistant_core.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dh.aswe.assistant_core.database.model.Deadline;
import jakarta.transaction.Transactional;

public interface DeadlineRepository extends JpaRepository<Deadline, Integer> {
    List<Deadline> findByAssistantUserId(Integer assistantUser_id);

    @Transactional
    void deleteByAssistantUserId(Integer assistantUser_id);
}