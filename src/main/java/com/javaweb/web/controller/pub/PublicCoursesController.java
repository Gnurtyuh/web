package com.javaweb.web.controller.pub;

import com.javaweb.web.entity.Courses;
import com.javaweb.web.service.CoursesService;
import com.javaweb.web.service.EnrollmentsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/Courses")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PublicCoursesController {
    @Autowired
    CoursesService courseService;
    @Autowired
    EnrollmentsService enrollmentsService;

    @GetMapping
    public ResponseEntity<List<Courses>> getAll() {
        List<Courses> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }
    @GetMapping("/MyCourse")
    public ResponseEntity<List<Courses>> getMyCourse(@RequestParam int userId) {
            List<Courses> courses= enrollmentsService.getCoursesByUserId(userId);
            return ResponseEntity.ok(courses);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        try {
            Courses course = courseService.getCourseById(id);
            return ResponseEntity.ok(course);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy khóa học.");
        }
    }
}
