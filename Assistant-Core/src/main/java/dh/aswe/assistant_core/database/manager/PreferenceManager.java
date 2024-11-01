package dh.aswe.assistant_core.database.manager;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Preference createPreference(final Preference preference) {
        return this.repository.save(preference);
    }

    @Transactional
    public Preference updatePreference(final Preference preference) {
        Optional<Preference> optPref = this.repository.findById(preference.getId());
        Preference pref = optPref.get();
        pref.setTopic(preference.getTopic());
        pref.setPriority(preference.getPriority());
        return this.repository.save(pref);
    }

    @Transactional
    public void deletePreference(final int id) {
        Optional<Preference> optPref = this.repository.findById(id);
        Preference pref = optPref.get();
        this.repository.delete(pref);
    }
}
