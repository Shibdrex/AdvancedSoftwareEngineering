package dh.aswe.assistant_core.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dh.aswe.assistant_core.database.model.Preference;
import jakarta.transaction.Transactional;

public interface PreferenceRepository extends JpaRepository<Preference, Integer> {
    List<Preference> findByUserId(Integer userId);

    @Transactional
    void deleteByUserId(Integer userId);
}
