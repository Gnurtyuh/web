package com.javaweb.web.service;

import com.javaweb.web.entity.Authentication;
import com.javaweb.web.repository.AdminRepo;
import com.javaweb.web.repository.UsersRepo;
import lombok.AccessLevel;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UsersRepo usersRepo;
    AdminRepo adminRepo;
    public boolean authenticate(Authentication authentication) {
        var user = usersRepo.findByName(authentication.getName()).orElseThrow(() -> new RuntimeException("user not found"));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        return passwordEncoder.matches(authentication.getPassword(),user.getPasswordHash());
    }
    public boolean authenticateAdmin(Authentication authentication) {
        var admin = adminRepo.findByName(authentication.getName()).orElseThrow(() -> new RuntimeException("admin not found"));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        return passwordEncoder.matches(authentication.getPassword(),admin.getPasswordHash());
    }
}
