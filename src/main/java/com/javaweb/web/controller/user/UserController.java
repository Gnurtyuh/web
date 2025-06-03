package com.javaweb.web.controller.user;

import com.javaweb.web.entity.Users;
import com.javaweb.web.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/user")
public class UserController {
    @Autowired
    private UsersService usersService;
    @PostMapping
    ResponseEntity<String> createUser(@RequestBody Users user) {
        usersService.userRegister(user);
        return ResponseEntity.ok("Đăng ký thành công");
    }
    @PostMapping("/{name}")
    ResponseEntity<?> updateUser(@RequestBody Users user) {
        usersService.updateUser(user);
        return ResponseEntity.ok("Đổi thông tin thành công");
    }

}
