package com.deutschmaster.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.deutschmaster.backend.security.JwtAuthFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ✅ CORS CONFIGURATION
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
    List.of(
        "http://localhost:5173",
        "https://deutsch-master-2lio.vercel.app"
    )
);

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            // ✅ ENABLE CORS
            .cors(cors ->
                cors.configurationSource(corsConfigurationSource())
            )

            .sessionManagement(sm ->
                sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authorizeHttpRequests(auth -> auth

                // ✅ AUTH APIs
                .requestMatchers("/auth/**").permitAll()

                // ✅ VOCABULARY APIs
                .requestMatchers("/vocabulary/all").permitAll()

                .requestMatchers("/vocabulary/add")
                .hasRole("ADMIN")

                .requestMatchers("/vocabulary/update/**")
                .hasRole("ADMIN")

                .requestMatchers("/vocabulary/delete/**")
                .hasRole("ADMIN")

                // ✅ GRAMMAR APIs
                .requestMatchers("/grammar/all").permitAll()

                .requestMatchers("/grammar/add")
                .hasRole("ADMIN")

                .requestMatchers("/grammar/update/**")
                .hasRole("ADMIN")

                .requestMatchers("/grammar/delete/**")
                .hasRole("ADMIN")

                // ✅ ALL OTHER APIs
                
             // ✅ QUIZ APIs
                .requestMatchers("/quiz/all").permitAll()

                .requestMatchers("/quiz/add")
                .hasAuthority("ROLE_ADMIN")

                .requestMatchers("/quiz/update/**")
                .hasAuthority("ROLE_ADMIN")

                .requestMatchers("/quiz/delete/**")
                .hasAuthority("ROLE_ADMIN")
                
                .anyRequest().authenticated()
            )

            // ✅ JWT FILTER
            .addFilterBefore(
                jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}