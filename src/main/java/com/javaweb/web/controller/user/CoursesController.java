package com.javaweb.web.controller.user;

import com.javaweb.web.entity.CourseSections;
import com.javaweb.web.entity.Courses;
import com.javaweb.web.service.CourseSectionsService;
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
@RequestMapping("/Courses")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CoursesController {
    @Autowired
    CoursesService courseService;
    @Autowired
    EnrollmentsService enrollmentsService;
    @Autowired
    CourseSectionsService sectionService;
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

    @GetMapping("/Section{courseId}")
    public ResponseEntity<List<CourseSections>> getByCourse(@PathVariable int courseId) {
        List<CourseSections> sections = sectionService.getCourseSectionsByCourseId(courseId);
        return ResponseEntity.ok(sections);
    }

    @GetMapping("/Section{id}")
    public ResponseEntity<?> getBySectionId(@PathVariable int id) {
        try {
            CourseSections section = sectionService.getCourseSectionsBySectionId(id);
            return ResponseEntity.ok(section);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy chương học.");
        }
    }
}
