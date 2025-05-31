package com.javaweb.web.repository;

import com.javaweb.web.entity.CourseSections;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoursesSectionsRepo extends JpaRepository<CourseSections, Integer> {
}
