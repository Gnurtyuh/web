package com.javaweb.web.controller;

import com.javaweb.web.entity.Api;
import com.javaweb.web.entity.Users;
import com.javaweb.web.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/user")
public class UserController {
    @Autowired
    private UsersService usersService;
    @PostMapping
    Api<Users> createUser(@RequestBody Users user) {
        return Api.<Users>builder()
                .result(usersService.userRegister(user))
                .build();
    }

    @GetMapping
    Api<List<Users>> getAllUsers() {
        return Api.<List<Users>>builder()
                .result(usersService.getAllUsers())
                .build();
    }

//    @PostMapping("/{id}")
//    Api<Users> updateUser(@RequestBody Users user) {
//        return Api.<Users>builder()
//                .result(usersService.)
//                .build();
//    }

}
