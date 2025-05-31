package com.javaweb.web.controller;
import com.javaweb.web.entity.Authentication;
import com.javaweb.web.service.AuthenticationService;
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
@RequestMapping("/authentication")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminAuthController {
    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/AdminLogin")
    public ResponseEntity<String> authenticate(@RequestBody Authentication authentication) {
        if(authenticationService.authenticateAdmin(authentication)){
            return ResponseEntity.ok("Đăng nhập thành công");
        }
        return null;
    }
}