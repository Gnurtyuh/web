package com.javaweb.web.controller;

import com.javaweb.web.entity.Enrollments;
import com.javaweb.web.entity.Topups;
import com.javaweb.web.service.EnrollmentsService;
import com.javaweb.web.service.TopupsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/Payment")

public class PaymentController {
    @Autowired
    private TopupsService topupsService;
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
    @GetMapping("/topup/history")
    public ResponseEntity<List<Topups>> getTopupHistory(@RequestParam int userId) {
        List<Topups> topupHistory = topupsService.findByUserId(userId);
        return ResponseEntity.ok(topupHistory);
    }
    @GetMapping("/enrollments")
    public ResponseEntity<List<Enrollments>> getEnrolledCourses(@RequestParam int userId) {
        List<Enrollments> enrollments = enrollmentService.getEnrollmentByUserId(userId);
        return ResponseEntity.ok(enrollments);
    }
    @GetMapping("findAll")
    public ResponseEntity<List<Enrollments>> findAll() {
        List<Enrollments> enrollments = enrollmentService.getAllEnrollments();
        return ResponseEntity.ok(enrollments);
    }
}
