package com.javaweb.web.controller.admin;

import com.javaweb.web.entity.Admin;
import com.javaweb.web.entity.Users;
import com.javaweb.web.service.AdminService;
import com.javaweb.web.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/AAAdmin")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private UsersService usersService;
    @PostMapping
    Admin createAdmin(@RequestBody Admin admin) {
        return adminService.adminRegister(admin);
    }
    @GetMapping("/UserAll")
    ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = usersService.getAllUsers();
        return ResponseEntity.ok(users);
    }

}
