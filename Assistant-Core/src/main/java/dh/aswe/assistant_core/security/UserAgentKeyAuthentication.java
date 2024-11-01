package dh.aswe.assistant_core.security;

import java.util.Collection;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class UserAgentKeyAuthentication extends AbstractAuthenticationToken{
    private final String userAgentKey;

    public UserAgentKeyAuthentication(String userAgentKey, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.userAgentKey = userAgentKey;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return userAgentKey;
    }
}
