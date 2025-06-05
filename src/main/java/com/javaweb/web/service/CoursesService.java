package com.javaweb.web.service;

import com.javaweb.web.entity.Courses;
import com.javaweb.web.repository.CoursesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoursesService {
    @Autowired
    private CoursesRepo coursesRepo;

    public List<Courses> getAllCourses() {
        return coursesRepo.findAll();
    }
    public Courses getCourseById(int id) {
        return coursesRepo.findById(id).orElseThrow(()-> new RuntimeException("Course Not Found"));
    }
    public Courses addCourse(Courses course) {
        return coursesRepo.save(course);
    }
    public Courses updateCourse(int id,Courses course) {
        if (coursesRepo.findById(id).orElseThrow(()-> new RuntimeException("Course Not Found")) != null) {
            return coursesRepo.save(course);

        }
        return null;
    }
    public void deleteCourse(int id) {
        coursesRepo.deleteById(id);
    }
    public Courses getCourseByTitle(String title) {
        return coursesRepo.findByTitle(title);
    }
}
