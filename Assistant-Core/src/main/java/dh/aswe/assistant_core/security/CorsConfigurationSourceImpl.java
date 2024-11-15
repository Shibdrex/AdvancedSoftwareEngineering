// package dh.aswe.assistant_core.security;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;

// import jakarta.servlet.http.HttpServletRequest;
// import java.util.List;

// @Configuration
// public class CorsConfigurationSourceImpl implements CorsConfigurationSource {
//     @Override
//     public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//         CorsConfiguration corsConfiguration = new CorsConfiguration();
//         corsConfiguration.setAllowedHeaders(List.of("*"));
//         corsConfiguration.setAllowedOriginPatterns(List.of("*"));
//         corsConfiguration.setAllowedMethods(List.of("*"));
//         corsConfiguration.setAllowCredentials(true);
//         corsConfiguration.setExposedHeaders(List.of("Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
//         return corsConfiguration;
//     }
// }