package com.javaweb.web.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "course_sections")
public class CourseSections {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    @Column(name = "course_id", nullable = false)
    int courseId;
    @Column(name = "title", nullable = false)
    String title;
    @Column(name = "section_order", nullable = false)
    String sectionOrder;
    @Column(name = "created_at", nullable = false)
    Timestamp created_at;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSectionOrder() {
        return sectionOrder;
    }

    public void setSectionOrder(String sectionOrder) {
        this.sectionOrder = sectionOrder;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }
}
