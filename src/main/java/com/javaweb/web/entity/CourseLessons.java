package com.javaweb.web.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "course_lessons")
public class CoursesLessons {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "section_id", nullable = false)
    private int sectionId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "content", nullable = false)
    private String content;
    @Column(name = "lesson_order", nullable = false)
    private String lessonOrder;
    @Column(name = "video_url", nullable = false)
    private String videoUrl;
    @Column(name = "created_at", nullable = false)
    private Timestamp created_at;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSectionId() {
        return sectionId;
    }

    public void setSectionId(int sectionId) {
        this.sectionId = sectionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLessonOrder() {
        return lessonOrder;
    }

    public void setLessonOrder(String lessonOrder) {
        this.lessonOrder = lessonOrder;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }
}
