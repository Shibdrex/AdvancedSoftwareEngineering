package dh.aswe.assistant_core.security;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;

import jakarta.servlet.http.HttpServletRequest;

public class AuthenticationService {

    private static final String AUTH_TOKEN_HEADER_NAME = "Auth";
    private static final String[] AUTH_TOKEN = System.getenv("AUTHORIZATION_KEYS").split(";");

    private static final String USER_AGENT_TOKEN_HEADER_NAME = "User-Agent";
    private static final String[] USER_AGENT_TOKEN = System.getenv("KNOWN_USER_AGENTS").split(";");

    public static Authentication getAuthentication(HttpServletRequest request) {
        String authKey = request.getHeader(AUTH_TOKEN_HEADER_NAME);
        if (authKey == null || !checkArray(AUTH_TOKEN, authKey)) {
            throw new BadCredentialsException("Unauthorized request");
        }
        return new AuthKeyAuthentication(authKey, AuthorityUtils.NO_AUTHORITIES);
    }

    public static Authentication getUserAgent(HttpServletRequest request) {
        String userAgentKey = request.getHeader(USER_AGENT_TOKEN_HEADER_NAME);
        if (userAgentKey == null || !checkArray(USER_AGENT_TOKEN, userAgentKey)) {
            throw new BadCredentialsException("Unauthorized request");
        }
        return new UserAgentKeyAuthentication(userAgentKey, AuthorityUtils.NO_AUTHORITIES);
    }

    private static Boolean checkArray(final String[] array, String token) {
        for (String string : array) {
            if (string.equals(token))
                return true;
        }
        return false;
    }
}