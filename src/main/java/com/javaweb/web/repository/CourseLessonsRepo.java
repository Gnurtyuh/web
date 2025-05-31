package com.javaweb.web.repository;

import com.javaweb.web.entity.CoursesLessons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoursesLessonsRepo extends JpaRepository<CoursesLessons, Integer> {
    public CoursesLessons findByName(String name);
    public CoursesLessons findBySectionId(int sectionId);
}
