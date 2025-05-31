package com.javaweb.web.controller;

import com.javaweb.web.entity.Api;
import com.javaweb.web.entity.CourseLessons;
import com.javaweb.web.service.CourseLessonsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Lesson")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CourseLessonsController {
    @Autowired
    CourseLessonsService courseLessonsService;
    @GetMapping("/{id}")
    public ResponseEntity<?> getLesson(@PathVariable int id,
                                       @RequestParam int userId) {
        CourseLessons lesson = courseLessonsService.getLessonWithAccessCheck(id, userId);
        return ResponseEntity.ok(lesson);
    }

    @PostMapping
    ResponseEntity<String> addCourseLesson(@RequestBody CourseLessons courseLessons) {
        return ResponseEntity.ok("Thêm khóa học thành công");
    }
    @GetMapping("findAll")
    ResponseEntity<List<CourseLessons>> getCoursesLessonBySectionId(@RequestParam("section_id") int sectionId) {
        List<CourseLessons> lessons = courseLessonsService.getCoursesLessonBySectionId(sectionId);
        return ResponseEntity.ok(lessons);
    }
    @GetMapping("find{id}")
    ResponseEntity<CourseLessons> findByLessonId(@RequestParam("lesson_id") int lessonId) {
        return ResponseEntity.ok(courseLessonsService.findById(lessonId));
    }
}
