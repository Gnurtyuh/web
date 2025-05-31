package com.javaweb.web.controller;

import com.javaweb.web.entity.Api;
import com.javaweb.web.entity.Authentication;
import com.javaweb.web.service.AuthenticationService;
import com.javaweb.web.util.AuthenticationUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;
    @PostMapping("/login")
    ResponseEntity<String> authenticate(@RequestBody Authentication authentication) {
        if (authenticationService.authenticate(authentication)){
            return ResponseEntity.ok("Đăng nhập thành công");
        }
        return null;
    }
}
