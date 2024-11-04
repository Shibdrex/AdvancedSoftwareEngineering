package dh.aswe.assistant_core.database.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import dh.aswe.assistant_core.database.controller.PreferenceController;
import dh.aswe.assistant_core.database.model.Preference;

@Component
public class PreferenceModelAssembler implements RepresentationModelAssembler<Preference, EntityModel<Preference>> {

    @Override
    public @NonNull EntityModel<Preference> toModel(@NonNull Preference preference) {

        return EntityModel.of(preference,
        linkTo(methodOn(PreferenceController.class).getOne(preference.getId())).withSelfRel(),
        linkTo(methodOn(PreferenceController.class).get()).withRel("preferences"));
    }
}
