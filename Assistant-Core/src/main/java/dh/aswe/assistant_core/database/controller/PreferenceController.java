package dh.aswe.assistant_core.database.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dh.aswe.assistant_core.database.assembler.PreferenceModelAssembler;
import dh.aswe.assistant_core.database.manager.PreferenceManager;
import dh.aswe.assistant_core.database.model.Preference;

@RestController
@RequestMapping("/api/data/preferences")
public class PreferenceController {

    @Autowired
    private PreferenceManager manager;

    @Autowired
    private PreferenceModelAssembler assembler;


    @GetMapping()
    public CollectionModel<EntityModel<Preference>> get() {
        List<EntityModel<Preference>> preferences = this.manager.getAllPreferences().stream()
        .map(assembler::toModel)
        .collect(Collectors.toList());

        return CollectionModel.of(preferences, linkTo(methodOn(PreferenceController.class).get()).withSelfRel());
    }

    @GetMapping("/{id}")
    public EntityModel<Preference> getOne(@PathVariable Integer id) {
        return assembler.toModel(manager.getPreference(id));
    }

    @PostMapping()
    public ResponseEntity<EntityModel<Preference>> post(@RequestBody Preference preference) {
       if (manager.isValid(preference)) {
        EntityModel<Preference> model = assembler.toModel(manager.createPreference(preference));
        return ResponseEntity
                .created(model.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(model);
       } 
       return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@RequestBody Preference preference, @PathVariable Integer id) {
        if (manager.isValid(preference)) {
            EntityModel<Preference> model = assembler.toModel(this.manager.updatePreference(preference, id));
            return ResponseEntity
                    .created(model.getRequiredLink(IanaLinkRelations.SELF).toUri())
                    .body(model);
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Preference> delelte(@PathVariable Integer id) {
        if (id > 0) {
            Preference deletedPref = this.manager.getPreference(id);
            this.manager.deletePreference(id);
            return ResponseEntity.ok(deletedPref);
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }
}
