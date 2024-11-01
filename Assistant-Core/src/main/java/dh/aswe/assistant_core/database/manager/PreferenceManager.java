package dh.aswe.assistant_core.database.manager;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dh.aswe.assistant_core.database.exception.PreferenceNotFoundException;
import dh.aswe.assistant_core.database.model.Preference;
import dh.aswe.assistant_core.database.repository.PreferenceRepository;

@Service
public class PreferenceManager {

    @Autowired
    private PreferenceRepository repository;

    public Boolean isValid(final Preference preference) {
        if (preference != null && !preference.getTopic().isEmpty()) {
            return true;
        }
        return false;
    }


    public Iterable<Preference> getAllPreferences() {
        return this.repository.findAll();
    }

    public Preference getPreference(final int id) {
        Preference result = this.repository.findById(id)
        .orElseThrow(() -> new PreferenceNotFoundException(id));
        return result;
    }

    public Preference createPreference(final Preference preference) {
        return this.repository.save(preference);
    }

    @Transactional
    public Preference updatePreference(final Preference newPreference, final Integer id) {
        return repository.findById(id)
            .map(preference -> {
                preference.setTopic(newPreference.getTopic());
                preference.setPriority(newPreference.getPriority());
                return repository.save(preference);
            })
            .orElseGet(() -> {
                return repository.save(newPreference);
            });
        }

    @Transactional
    public void deletePreference(final int id) {
        Optional<Preference> optPref = this.repository.findById(id);
        Preference pref = optPref.get();
        this.repository.delete(pref);
    }
}
