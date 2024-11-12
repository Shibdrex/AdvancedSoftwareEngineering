package dh.aswe.assistant_core.database.manager;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dh.aswe.assistant_core.database.exception.AssistantUserNotFoundException;
import dh.aswe.assistant_core.database.exception.PreferenceNotFoundException;
import dh.aswe.assistant_core.database.model.Preference;
import dh.aswe.assistant_core.database.model.Preference.Weight;
import dh.aswe.assistant_core.database.repository.AssistantUserRepository;
import dh.aswe.assistant_core.database.repository.PreferenceRepository;

@Service
public class PreferenceManager {

    @Autowired
    private PreferenceRepository preferenceRepository;

    @Autowired
    private AssistantUserRepository userRepository;

    public Boolean isValid(final Preference preference) {
        if (preference != null 
            && preference.getPriority() instanceof Weight) {
            return true;
        }
        return false;
    }

    public List<Preference> getAllPreferencesByUserId(final Integer userId) {
        if (!this.preferenceRepository.existsById(userId)) {
            throw new PreferenceNotFoundException(userId);
        }
        List<Preference> preferences = this.preferenceRepository.findByAssistantUserId(userId);
        return preferences;
    }

    public List<Preference> getAllPreferences() {
        return this.preferenceRepository.findAll();
    }

    public Preference getPreference(final int id) {
        Preference preference = this.preferenceRepository.findById(id)
        .orElseThrow(() -> new PreferenceNotFoundException(id));

        return preference;
    }

    public Preference createPreference(final Integer userId, final Preference preference) {
        Preference pref = userRepository.findById(userId).map(user -> {
            preference.setAssistantUser(user);
            return this.preferenceRepository.save(preference);
        }).orElseThrow(() -> new AssistantUserNotFoundException(userId));
        
        return pref;
    }

    @Transactional
    public Preference updatePreference(final Preference newPreference, final Integer id) {
        return preferenceRepository.findById(id)
            .map(preference -> {
                preference.setPriority(newPreference.getPriority());
                return preferenceRepository.save(preference);
            })
            .orElseGet(() -> {
                return preferenceRepository.save(newPreference);
            });
        }

    @Transactional
    public void deletePreference(final int id) {
        Optional<Preference> optPref = this.preferenceRepository.findById(id);
        Preference pref = optPref.get();
        this.preferenceRepository.delete(pref);
    }

    @Transactional
    public void deleteAllByUser(final Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new AssistantUserNotFoundException(userId);
        }
        this.preferenceRepository.deleteByAssistantUserId(userId);
    }
}
