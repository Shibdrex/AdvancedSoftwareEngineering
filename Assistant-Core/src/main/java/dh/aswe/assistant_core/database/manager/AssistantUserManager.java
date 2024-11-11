package dh.aswe.assistant_core.database.manager;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dh.aswe.assistant_core.database.exception.AssistantUserNotFoundException;
import dh.aswe.assistant_core.database.model.AssistantUser;
import dh.aswe.assistant_core.database.repository.AssistantUserRepository;

@Service
public class AssistantUserManager {

    @Autowired
    private AssistantUserRepository repository;

    public Boolean isValid(final AssistantUser user) {
        if (user != null
                && user.getFirstname() != null
                && user.getLastname() != null
                && user.getEmail() != null
                && user.getPassword() != null
                && user.getAge() != null
                && user.getPlace() != null
                && user.getNewsTopics() != null
                && user.getNewsTopics().length > 0) {
            return true;
        }
        return false;
    }

    public List<AssistantUser> getAllAssistantUsers() {
        return this.repository.findAll();
    }

    public List<AssistantUser> getAllAssistantUsersWithFirstname(final String firstname) {
        List<AssistantUser> assistantUsers = new ArrayList<>();

        if (firstname == null)
            this.repository.findAll().forEach(assistantUsers::add);
        else
            this.repository.findByFirstnameContaining(firstname).forEach(assistantUsers::add);
        
        if (assistantUsers.isEmpty()) {
            return null;
        }
        return assistantUsers;
    }

    public AssistantUser getAssistantUser(final int id) {
        AssistantUser user = this.repository.findById(id)
                .orElseThrow(() -> new AssistantUserNotFoundException(id));

        return user;
    }

    public AssistantUser createAssistantUser(final AssistantUser user) {
        return this.repository.save(user);
    }

    @Transactional
    public AssistantUser updateAssistantUser(final AssistantUser newUser, final Integer id) {
        return repository.findById(id)
                .map(user -> {
                    user.setFirstname(newUser.getFirstname());
                    user.setLastname(newUser.getLastname());
                    user.setEmail(newUser.getEmail());
                    user.setPassword(newUser.getPassword());
                    user.setAge(newUser.getAge());
                    user.setPlace(newUser.getPlace());
                    user.setNewsTopics(newUser.getNewsTopics());
                    return repository.save(user);
                })
                .orElseGet(() -> {
                    return repository.save(newUser);
                });
    }

    @Transactional
    public void deleteAssistantUser(final int id) {
        Optional<AssistantUser> optUser = this.repository.findById(id);
        AssistantUser user = optUser.get();
        this.repository.delete(user);
    }

    @Transactional
    public void deleteAll() {
        this.repository.deleteAll();
    }

    public List<AssistantUser> findByEmail(final String email) {
        List<AssistantUser> users = this.repository.findByEmail(email);

        if (users.isEmpty()) {
            return null;
        }
        return users;
    }
}
