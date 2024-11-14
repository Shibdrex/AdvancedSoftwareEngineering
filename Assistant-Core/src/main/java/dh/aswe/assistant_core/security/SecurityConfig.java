package dh.aswe.assistant_core.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CorsConfigurationSourceImpl corsConfigurationSource;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(
                    authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
                            .requestMatchers("/**")
                            .permitAll()
                            .anyRequest()
                            .authenticated())
            .httpBasic(Customizer.withDefaults())
            .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(new AuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new UserAgentFilter(), UsernamePasswordAuthenticationFilter.class)
            .cors(cors -> cors.configurationSource(corsConfigurationSource));
            return http.build();
        }
}