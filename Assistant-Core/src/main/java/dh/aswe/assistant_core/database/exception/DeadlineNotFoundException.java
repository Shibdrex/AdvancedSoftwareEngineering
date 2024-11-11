package dh.aswe.assistant_core.database.exception;

public class DeadlineNotFoundException extends RuntimeException {

    public DeadlineNotFoundException(Integer id) {
        super("Could not find deadline [" + id + "]");
    }
}
