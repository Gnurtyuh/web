package com.javaweb.web.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "course_lessons")
@Data
public class CourseLessons {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @JoinColumn(name = "section_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private CourseSections section;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "content", updatable = false, insertable = false)
    private String content;
    @Column(name = "lesson_order", nullable = false)
    private String lessonOrder;
    @Column(name = "video_url", updatable = false, insertable = false)
    private String videoUrl;
    @Column(name = "created_at", updatable = false, insertable = false)
    private Timestamp createdAt;

}
