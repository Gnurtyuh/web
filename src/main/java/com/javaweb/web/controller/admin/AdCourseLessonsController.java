package com.javaweb.web.controller.admin;

import com.javaweb.web.entity.CourseLessons;
import com.javaweb.web.service.CourseLessonsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController
@RequestMapping("/admin/AdCourseLesson")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AdCourseLessonsController {
    @Autowired
    CourseLessonsService courseLessonsService;
    @PostMapping
    ResponseEntity<String> addCourseLesson(@RequestBody CourseLessons courseLessons) {
        return ResponseEntity.ok("Thêm khóa học thành công");
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getLesson(@PathVariable int id,
                                       @RequestParam int userId) {
        CourseLessons lesson = courseLessonsService.getLessonWithAccessCheck(id, userId);
        return ResponseEntity.ok(lesson);
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
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody CourseLessons lesson) {
        try {
            CourseLessons updated = courseLessonsService.updateCoursesLesson(id, lesson);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy bài học.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            courseLessonsService.deleteCoursesLesson(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy bài học.");
        }
    }
}
