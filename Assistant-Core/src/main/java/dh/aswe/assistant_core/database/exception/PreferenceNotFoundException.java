package dh.aswe.assistant_core.database.exception;

public class PreferenceNotFoundException extends RuntimeException {

    public PreferenceNotFoundException(Integer id) {
        super("Could not find preference [" + id + "]");
    }
}
