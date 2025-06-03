package com.javaweb.web.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "course_sections")
@Data
public class CourseSections {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @JoinColumn(name = "course_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Courses course;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "section_order", nullable = false)
    private String sectionOrder;
    @Column(name = "created_at", updatable = false, insertable = false)
    private Timestamp createdAt;

}
