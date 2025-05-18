
package com.budgettracker.api.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class FirebaseAuthenticationToken extends AbstractAuthenticationToken {
    
    private final String uid;
    private final String token;
    
    public FirebaseAuthenticationToken(String uid, String token, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.uid = uid;
        this.token = token;
        setAuthenticated(true);
    }
    
    @Override
    public Object getCredentials() {
        return token;
    }
    
    @Override
    public Object getPrincipal() {
        return uid;
    }
    
    @Override
    public String getName() {
        return uid;
    }
}
