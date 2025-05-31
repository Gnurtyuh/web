package com.javaweb.web.controller;

import com.javaweb.web.entity.Api;
import com.javaweb.web.entity.Enrollments;
import com.javaweb.web.entity.Topups;
import com.javaweb.web.service.EnrollmentsService;
import com.javaweb.web.service.TopupsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/Topups")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class TopupsController {
    @Autowired
    TopupsService topupsService;
    @Autowired
    private EnrollmentsService enrollmentService;
    @PostMapping("/topup")
    public ResponseEntity<String> addTopups(@RequestParam Topups topups) {
        topupsService.addTopups(topups);
        return ResponseEntity.ok("Nạp tiền thành công");
    }
    @PostMapping("/buy-course")
    public ResponseEntity<String> buyCourse(@RequestParam int userId, @RequestParam int courseId) {
        String message = enrollmentService.enroll(userId, courseId);
        return ResponseEntity.ok(message);
    }

    // GET endpoint to retrieve topup history
    @GetMapping("/topup/history")
    public ResponseEntity<List<Topups>> getTopupHistory(@RequestParam int userId) {
        List<Topups> topupHistory = topupsService.findByUserId(userId);
        return ResponseEntity.ok(topupHistory);
    }

    // GET endpoint to retrieve enrolled courses
    @GetMapping("/enrollments")
    public ResponseEntity<List<Enrollments>> getEnrolledCourses(@RequestParam int userId) {
        List<Enrollments> enrolledCourses = enrollmentService.getEnrollmentByUserId(userId);
        return ResponseEntity.ok(enrolledCourses);
    }

    @GetMapping("findAll")
    Api<List<Topups>> findAll() {
        return Api.<List<Topups>>builder()
                .result(topupsService.getAllTopups())
                .build();
    }
}
