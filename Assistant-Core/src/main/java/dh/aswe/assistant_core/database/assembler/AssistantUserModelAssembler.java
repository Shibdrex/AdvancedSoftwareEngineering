package dh.aswe.assistant_core.database.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import dh.aswe.assistant_core.database.controller.AssistantUserController;
import dh.aswe.assistant_core.database.model.AssistantUser;

@Component
public class AssistantUserModelAssembler implements RepresentationModelAssembler<AssistantUser, EntityModel<AssistantUser>> {

    @Override
    public @NonNull EntityModel<AssistantUser> toModel(@NonNull AssistantUser user) {

        return EntityModel.of(user,
        linkTo(methodOn(AssistantUserController.class).getOne(user.getId())).withSelfRel(),
        linkTo(methodOn(AssistantUserController.class).get()).withRel("users"));
    }
}
