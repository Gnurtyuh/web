package com.javaweb.web.controller.admin;

import com.javaweb.web.entity.Admin;
import com.javaweb.web.entity.Users;
import com.javaweb.web.service.AdminService;
import com.javaweb.web.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController
@RequestMapping("/api/admin/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private UsersService usersService;
    @PostMapping
    Admin createAdmin(@RequestBody Admin admin) {
        return adminService.adminRegister(admin);
    }
    @GetMapping("/userAll")
    ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = usersService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", usersService.count());
        return ResponseEntity.ok(stats);
    }
}
