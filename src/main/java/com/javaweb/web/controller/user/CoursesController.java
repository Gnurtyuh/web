package com.javaweb.web.controller;

import com.javaweb.web.entity.Api;
import com.javaweb.web.entity.Courses;
import com.javaweb.web.service.CoursesService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Courses")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CoursesController {
    @Autowired
    CoursesService coursesService;
    @PostMapping
    Api<Courses> createCourse(@RequestBody Courses course) {
        return Api.<Courses>builder()
                .result(coursesService.addCourse(course))
                .build();
    }
    @GetMapping
    Api<List<Courses>> getAllCourses() {
        return Api.<List<Courses>>builder()
                .result(coursesService.getAllCourses())
                .build();
    }
}
