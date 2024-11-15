package dh.aswe.assistant_core.security;

import java.util.Collection;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

// public class AuthKeyAuthentication extends AbstractAuthenticationToken {
//     private final String authKey;

//     public AuthKeyAuthentication(String authKey, Collection<? extends GrantedAuthority> authorities) {
//         super(authorities);
//         this.authKey = authKey;
//         setAuthenticated(true);
//     }

//     @Override
//     public Object getCredentials() {
//         return null;
//     }

//     @Override
//     public Object getPrincipal() {
//         return authKey;
//     }
// }
