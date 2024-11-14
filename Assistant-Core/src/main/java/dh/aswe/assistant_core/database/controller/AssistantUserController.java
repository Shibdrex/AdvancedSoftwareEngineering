package dh.aswe.assistant_core.database.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dh.aswe.assistant_core.database.assembler.AssistantUserModelAssembler;
import dh.aswe.assistant_core.database.manager.AssistantUserManager;
import dh.aswe.assistant_core.database.model.AssistantUser;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/data/users")
public class AssistantUserController {

    @Autowired
    private AssistantUserManager manager;

    @Autowired
    private AssistantUserModelAssembler assembler;


    @GetMapping()
    public CollectionModel<EntityModel<AssistantUser>> get() {
        List<EntityModel<AssistantUser>> users = this.manager.getAllAssistantUsers().stream()
        .map(assembler::toModel)
        .collect(Collectors.toList());

        return CollectionModel.of(users, linkTo(methodOn(AssistantUserController.class).get()).withSelfRel());
    }

    @GetMapping("/containing")
    public CollectionModel<EntityModel<AssistantUser>> getAllAssistantUsers(@RequestParam(required = false, name = "firstname") String firstname) {
        List<AssistantUser> users = this.manager.getAllAssistantUsersWithFirstname(firstname);
        if (users == null)
            return CollectionModel.empty();
        
        List<EntityModel<AssistantUser>> assistantUsers = users.stream()
        .map(assembler::toModel)
        .collect(Collectors.toList());

        return CollectionModel.of(assistantUsers, linkTo(methodOn(AssistantUserController.class).get()).withSelfRel());
    }

    @GetMapping("/{id}")
    public EntityModel<AssistantUser> getOne(@PathVariable Integer id) {
        return assembler.toModel(manager.getAssistantUser(id));
    }

    @PostMapping()
    public ResponseEntity<EntityModel<AssistantUser>> post(@RequestBody AssistantUser user) {
        if (manager.isValid(user)) {
            EntityModel<AssistantUser> model = assembler.toModel(manager.createAssistantUser(user));
            return ResponseEntity
                    .created(model.getRequiredLink(IanaLinkRelations.SELF).toUri())
                    .body(model);
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@RequestBody AssistantUser user, @PathVariable Integer id) {
        if (manager.isValid(user)) {
            EntityModel<AssistantUser> model = assembler.toModel(this.manager.updateAssistantUser(user, id));
            return ResponseEntity
                    .created(model.getRequiredLink(IanaLinkRelations.SELF).toUri())
                    .body(model);
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AssistantUser> delete(@PathVariable Integer id) {
        if (id > 0) {
            AssistantUser deletedUser = this.manager.getAssistantUser(id);
            this.manager.deleteAssistantUser(id);
            return ResponseEntity.ok(deletedUser);
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }

    @DeleteMapping()
    public ResponseEntity<HttpStatus> deleteAll() {
        this.manager.deleteAll();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/email")
    public CollectionModel<EntityModel<AssistantUser>> findByEmail(@RequestParam(required = false, name = "email") String email) {
        List<AssistantUser> users = this.manager.findByEmail(email);
        if (users == null)
            return CollectionModel.empty();
        
        List<EntityModel<AssistantUser>> assistantUsers = users.stream()
        .map(assembler::toModel)
        .collect(Collectors.toList());

        return CollectionModel.of(assistantUsers, linkTo(methodOn(AssistantUserController.class).get()).withSelfRel());
    }
}
