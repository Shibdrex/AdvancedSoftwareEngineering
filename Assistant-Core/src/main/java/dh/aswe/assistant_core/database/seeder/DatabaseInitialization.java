package dh.aswe.assistant_core.database.seeder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import dh.aswe.assistant_core.database.model.AssistantUser;
import dh.aswe.assistant_core.database.model.Deadline;
import dh.aswe.assistant_core.database.model.Preference;
import dh.aswe.assistant_core.database.model.Preference.Weight;
import dh.aswe.assistant_core.database.repository.AssistantUserRepository;
import dh.aswe.assistant_core.database.repository.DeadlineRepository;
import dh.aswe.assistant_core.database.repository.PreferenceRepository;

@Configuration
public class DatabaseInitialization {

    private static final Logger log = LoggerFactory.getLogger(DatabaseInitialization.class);


    @Bean
    CommandLineRunner initDatabase(PreferenceRepository prefRepository, DeadlineRepository deadlineRepository, AssistantUserRepository assistantUserRepository) {
        AssistantUser user =  new AssistantUser("Kevin", "Bacon",  "kevin.bacon@balls.moon", "password", 69, "Stuttgart", new String[]{"inland", "ausland"});
        return args -> {
            log.info("Preloading User " + assistantUserRepository.save(user));

            log.info("Preloading Preference " + prefRepository.save(new Preference(Weight.LOW, "Laufen", user)));
            log.info("Preloading Preference " + prefRepository.save(new Preference(Weight.HIGH, "Steine sammeln", user)));

            log.info("Preloading Deadline " + deadlineRepository.save(new Deadline("ASWE Projekt", "Mon 17.11.2024 12:00", user)));
            log.info("Preloading Deadline " + deadlineRepository.save(new Deadline("Lebenswillen", "Tue 13.04.2033 09:46", user)));
        };
    }
}
