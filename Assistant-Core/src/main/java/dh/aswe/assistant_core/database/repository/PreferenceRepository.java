package dh.aswe.assistant_core.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dh.aswe.assistant_core.database.model.Preference;

public interface PreferenceRepository extends JpaRepository<Preference, Integer> {
}
