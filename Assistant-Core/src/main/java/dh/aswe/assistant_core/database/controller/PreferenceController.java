package dh.aswe.assistant_core.database.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dh.aswe.assistant_core.database.manager.PreferenceManager;
import dh.aswe.assistant_core.database.model.Preference;

@RestController
@RequestMapping("/api/data/preferences")
public class PreferenceController {

    @Autowired
    private PreferenceManager manager;


    @GetMapping()
    public ResponseEntity<Iterable<Preference>> get() {
        return ResponseEntity.ok(this.manager.getAllPreferences());
    }

    @PostMapping()
    public ResponseEntity<Preference> post(@RequestBody Preference preference) {
       if (manager.isValid(preference)) {
        return ResponseEntity.ok(this.manager.createPreference(preference));
       } 
       return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }

    @PutMapping()
    public ResponseEntity<Preference> put(@RequestBody Preference preference) {
        if (manager.isValid(preference)) {
            return ResponseEntity.ok(this.manager.updatePreference(preference));
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> delelte(@RequestParam int id) {
        if (id > 0) {
            this.manager.deletePreference(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }
}
