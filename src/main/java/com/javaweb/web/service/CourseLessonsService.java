package com.javaweb.web.service;

import com.javaweb.web.entity.CoursesLessons;
import com.javaweb.web.repository.CoursesLessonsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseLessonService {
    @Autowired
    private CoursesLessonsRepo coursesLessonsRepo;
    public List<CoursesLessons> getAllCoursesLessons() {
        return coursesLessonsRepo.findAll();
    }
    public CoursesLessons getCoursesLessonById(int id) {
        return coursesLessonsRepo.findById(id).get();
    }
    public CoursesLessons getCoursesLessonByName(String name) {
        return coursesLessonsRepo.findByName(name);
    }
    public CoursesLessons getCoursesLessonBySectionId(int sectionId) {
        return coursesLessonsRepo.findBySectionId(sectionId);
    }
    public CoursesLessons addCoursesLesson(CoursesLessons coursesLesson) {
        return coursesLessonsRepo.save(coursesLesson);
    }
    public CoursesLessons updateCoursesLesson(CoursesLessons coursesLesson) {
        return coursesLessonsRepo.save(coursesLesson);
    }
    public void deleteCoursesLesson(int id) {
        coursesLessonsRepo.deleteById(id);
    }
}
