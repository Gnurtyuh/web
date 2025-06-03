package com.javaweb.web.service;

import com.javaweb.web.entity.CourseSections;
import com.javaweb.web.entity.Courses;
import com.javaweb.web.repository.CourseSectionsRepo;
import com.javaweb.web.repository.CoursesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseSectionsService {
    @Autowired
    private CourseSectionsRepo courseSectionsRepo;
    @Autowired
    private CoursesRepo coursesRepo;
    public List<CourseSections> getAllCourseSections() {
        return courseSectionsRepo.findAll();
    }
    public CourseSections getCourseSectionsBySectionId(int id) {
        return courseSectionsRepo.findById(id).orElseThrow(()-> new RuntimeException("Course Section Not Found"));
    }
    public List<CourseSections> getCourseSectionsByCourseId(int courseId) {
        return courseSectionsRepo.findByCourseId(courseId);
    }
    public CourseSections getCourseSectionsByTitle(String title) {
        return courseSectionsRepo.findByTitle(title);
    }
    public CourseSections addCourseSections(int courseId, CourseSections section) {
        Courses course = coursesRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khóa học"));
        section.setCourse(course);
        return courseSectionsRepo.save(section);
    }

    public CourseSections update(int id, CourseSections updated) {
        CourseSections section = getCourseSectionsBySectionId(id);
        section.setTitle(updated.getTitle());
        section.setSectionOrder(updated.getSectionOrder());
        return courseSectionsRepo.save(section);
    }

    public void deleteCourseSections(int id) {
        courseSectionsRepo.deleteById(id);
    }

}
