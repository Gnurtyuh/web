package com.javaweb.web.controller.user;

import com.javaweb.web.repository.EnrollmentsRepo;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/enrollment")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AccessController {
    @Autowired
    private EnrollmentsRepo enrollmentRepo;

    public void checkAccessToCourse(int userId, int courseId) {
        boolean enrolled = enrollmentRepo.existsByUserIdAndCourseId(userId, courseId);
        if (!enrolled) {
            throw new AccessDeniedException("Bạn chưa ghi danh khóa học này.");
        }
    }
}
