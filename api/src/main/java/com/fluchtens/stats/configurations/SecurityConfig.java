package com.fluchtens.stats.configurations;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Value("${client-url}")
    private String clientUrl;

    @Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
			.authorizeHttpRequests((requests) -> requests
				.requestMatchers("/").permitAll()
				.anyRequest().authenticated()
			)
			.exceptionHandling((exceptions) -> exceptions
                .authenticationEntryPoint((request, response, authException) -> {
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					JSONObject jsonResponse = new JSONObject();
					jsonResponse.put("message", "Authentication failed");
					response.setContentType("application/json");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write(jsonResponse.toString());
				})
            )
			.oauth2Login((oauth2) -> oauth2
				.loginPage("/oauth2/authorization/42")
				.defaultSuccessUrl(clientUrl, true)
				.failureHandler((request, response, exception) -> {
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    JSONObject jsonResponse = new JSONObject();
                    jsonResponse.put("message", exception.getMessage());
                    response.setContentType("application/json");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(jsonResponse.toString());
				})
			)
			.logout((logout) -> logout
				.logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(HttpServletResponse.SC_OK);
                })
			)
			.sessionManagement((session) -> session
				.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)	
			)
			.csrf(AbstractHttpConfigurer::disable)
			.build();
	}
}
