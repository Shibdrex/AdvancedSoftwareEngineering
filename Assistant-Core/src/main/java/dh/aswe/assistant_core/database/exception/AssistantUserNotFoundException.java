package dh.aswe.assistant_core.database.exception;

public class AssistantUserNotFoundException extends RuntimeException {

    public AssistantUserNotFoundException(Integer id) {
        super("Could not find user [" + id + "]");
    }
}
