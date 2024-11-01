package dh.aswe.assistant_core.database.seeder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import dh.aswe.assistant_core.database.model.Preference;
import dh.aswe.assistant_core.database.model.Preference.Weight;
import dh.aswe.assistant_core.database.repository.PreferenceRepository;

@Configuration
public class DatabaseInitialization {

    private static final Logger log = LoggerFactory.getLogger(DatabaseInitialization.class);


    @Bean
    CommandLineRunner initDatabase(PreferenceRepository repository) {

        return args -> {
            log.info("Preloading " + repository.save(new Preference("War", Weight.LOW)));
            log.info("Preloading " + repository.save(new Preference("Science", Weight.HIGH)));
            log.info("Preloading " + repository.save(new Preference("Politics", Weight.MEDIUM)));
        };
    }
}
