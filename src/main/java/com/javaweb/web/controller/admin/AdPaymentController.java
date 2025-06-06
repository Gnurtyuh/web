package com.javaweb.web.controller.admin;

import com.javaweb.web.entity.Enrollments;
import com.javaweb.web.entity.Topups;
import com.javaweb.web.service.EnrollmentsService;
import com.javaweb.web.service.TopupsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController
@RequestMapping("/api/admin/payment")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AdPaymentController {
    @Autowired
    TopupsService topupsService;
    @Autowired
    EnrollmentsService enrollmentService;
    @PutMapping("/{id}/status")
    public ResponseEntity<?> UpdateTopups(@PathVariable int id, @RequestBody String status) {
        if (topupsService.updateTopups(id, status)){
            return ResponseEntity.ok("Xét duyệt thành công");
        }
        return ResponseEntity.ok("Xét duyệt thất bại");
    }
    @GetMapping("/history")
    public ResponseEntity<List<Topups>> history() {
        return ResponseEntity.ok(topupsService.getAllTopups());
    }
    @GetMapping("/enrollments")
    public ResponseEntity<List<Enrollments>> getEnrolledCourses(@RequestParam int userId) {
        List<Enrollments> enrollments = enrollmentService.getEnrollmentByUserId(userId);
        return ResponseEntity.ok(enrollments);
    }
    @GetMapping("/findAll")
    public ResponseEntity<List<Enrollments>> findAll() {
        List<Enrollments> enrollments = enrollmentService.getAllEnrollments();
        return ResponseEntity.ok(enrollments);
    }

}
