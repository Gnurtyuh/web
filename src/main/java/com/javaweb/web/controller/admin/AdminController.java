package com.javaweb.web.controller;

import com.javaweb.web.entity.Admin;
import com.javaweb.web.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/AdminA")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @PostMapping
    Admin createAdmin(@RequestBody Admin admin) {
        return adminService.adminRegister(admin);
    }

}
