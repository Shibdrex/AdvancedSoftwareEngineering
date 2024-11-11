package dh.aswe.assistant_core.database.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import dh.aswe.assistant_core.database.controller.DeadlineController;
import dh.aswe.assistant_core.database.model.Deadline;

@Component
public class DeadlineModelAssembler implements RepresentationModelAssembler<Deadline, EntityModel<Deadline>> {
    
    @Override
    public @NonNull EntityModel<Deadline> toModel(@NonNull Deadline deadline) {

        return EntityModel.of(deadline,
        linkTo(methodOn(DeadlineController.class).getOne(deadline.getId())).withSelfRel(),
        linkTo(methodOn(DeadlineController.class).get()).withRel("deadlines"));
    }
}
