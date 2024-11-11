package dh.aswe.assistant_core.database.manager;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dh.aswe.assistant_core.database.exception.AssistantUserNotFoundException;
import dh.aswe.assistant_core.database.exception.DeadlineNotFoundException;
import dh.aswe.assistant_core.database.model.Deadline;
import dh.aswe.assistant_core.database.repository.AssistantUserRepository;
import dh.aswe.assistant_core.database.repository.DeadlineRepository;

@Service
public class DeadlineManager {

    @Autowired
    private DeadlineRepository deadlineRepository;

    @Autowired
    private AssistantUserRepository userRepository;

    public Boolean isValid(final Deadline deadline) {
        if (deadline != null
                && deadline.getName() != null
                && deadline.getDate() != null) {
            return true;
        }
        return false;
    }

    public List<Deadline> getAllDeadlinesByUserId(final Integer userId) {
        if (!this.deadlineRepository.existsById(userId)) {
            throw new DeadlineNotFoundException(userId);
        }
        List<Deadline> deadlines = this.deadlineRepository.findByUserId(userId);
        return deadlines;
    }

    public List<Deadline> getAllDeadlines() {
        return this.deadlineRepository.findAll();
    }

    public Deadline getDeadline(final int id) {
        Deadline deadline = this.deadlineRepository.findById(id)
        .orElseThrow(() -> new DeadlineNotFoundException(id));

        return deadline;
    }

    public Deadline createDeadline(final Integer userId, final Deadline deadline) {
        Deadline dl = userRepository.findById(userId).map(user -> {
            deadline.setAssistantUser(user);
            return this.deadlineRepository.save(deadline);
        }).orElseThrow(() -> new AssistantUserNotFoundException(userId));
        
        return dl;
    }

    @Transactional
    public Deadline updateDeadline(final Deadline newDeadline, final Integer id) {
        return deadlineRepository.findById(id)
            .map(deadline -> {
                deadline.setName(newDeadline.getName());
                deadline.setDate(newDeadline.getDate());
                return deadlineRepository.save(deadline);
            })
            .orElseGet(() -> {
                return deadlineRepository.save(newDeadline);
            });
    }

    @Transactional
    public void deleteDeadline(final int id) {
        Optional<Deadline> optDeadline = this.deadlineRepository.findById(id);
        Deadline deadline = optDeadline.get();
        this.deadlineRepository.delete(deadline);
    }

    @Transactional
    public void deleteAllByUser(final Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new AssistantUserNotFoundException(userId);
        }
        this.deadlineRepository.deleteByUserId(userId);
    }
}
