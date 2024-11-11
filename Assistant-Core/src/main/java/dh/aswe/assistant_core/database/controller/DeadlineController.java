package dh.aswe.assistant_core.database.controller;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
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

import dh.aswe.assistant_core.database.assembler.DeadlineModelAssembler;
import dh.aswe.assistant_core.database.manager.DeadlineManager;
import dh.aswe.assistant_core.database.model.Deadline;

@RestController
@RequestMapping("/api/data/deadlines")
public class DeadlineController {

    @Autowired
    private DeadlineManager deadlineManager;

    @Autowired
    private DeadlineModelAssembler assembler;

    @GetMapping()
    public CollectionModel<EntityModel<Deadline>> get() {
        List<EntityModel<Deadline>> users = this.deadlineManager.getAllDeadlines().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(users, linkTo(methodOn(DeadlineController.class).get()).withSelfRel());
    }

    @GetMapping("/users/{userId}/deadlines")
    public CollectionModel<EntityModel<Deadline>> getAllDeadlinesByUserId(
            @PathVariable(value = "userId") Integer userId) {
        List<EntityModel<Deadline>> deadlines = this.deadlineManager.getAllDeadlinesByUserId(userId).stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(deadlines, linkTo(methodOn(DeadlineController.class).get()).withSelfRel());
    }

    @GetMapping("/{id}")
    public EntityModel<Deadline> getOne(@PathVariable Integer id) {
        return assembler.toModel(deadlineManager.getDeadline(id));
    }

    @PostMapping("/users/{userId}")
    public ResponseEntity<EntityModel<Deadline>> post(@PathVariable(value = "userId") Integer userId,
            @RequestBody Deadline deadline) {
        if (deadlineManager.isValid(deadline)) {
            EntityModel<Deadline> model = assembler.toModel(deadlineManager.createDeadline(userId, deadline));
            return ResponseEntity
                    .created(model.getRequiredLink(IanaLinkRelations.SELF).toUri())
                    .body(model);
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@RequestBody Deadline deadline, @PathVariable Integer id) {
        if (deadlineManager.isValid(deadline)) {
            EntityModel<Deadline> model = assembler.toModel(this.deadlineManager.updateDeadline(deadline, id));
            return ResponseEntity
                    .created(model.getRequiredLink(IanaLinkRelations.SELF).toUri())
                    .body(model);
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Deadline> delete(@PathVariable Integer id) {
        if (id > 0) {
            Deadline deletedDeadline = this.deadlineManager.getDeadline(id);
            this.deadlineManager.deleteDeadline(id);
            return ResponseEntity.ok(deletedDeadline);
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }

    @DeleteMapping("/users/{userId}")
    public CollectionModel<EntityModel<Deadline>> deleteAllCommentsOfUser(@PathVariable(name = "userId") Integer userId) {
        if (userId > 0) {
            List<EntityModel<Deadline>> deadlines = this.deadlineManager.getAllDeadlinesByUserId(userId).stream()
            .map(assembler::toModel)
            .collect(Collectors.toList());
            this.deadlineManager.deleteAllByUser(userId);
            return CollectionModel.of(deadlines, linkTo(methodOn(DeadlineController.class).get()).withSelfRel()); 
        }
        return CollectionModel.empty();
    }
}
