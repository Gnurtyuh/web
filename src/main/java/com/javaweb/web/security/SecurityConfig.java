package com.javaweb.web.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // tắt CSRF (cho REST API hoặc form test)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/register","/login").permitAll() // Cho phép ai cũng truy cập /register
                        .anyRequest().authenticated() // Các URL khác cần đăng nhập
                )
                .formLogin(Customizer.withDefaults()) // Dùng form login mặc định của Spring
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Để mã hóa password khi đăng ký
    }
}
