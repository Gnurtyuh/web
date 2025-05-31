package com.javaweb.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "wishlists")
public class Wishlists {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    @Column(name = "user_id", nullable = false)
    int userId;
    @Column(name = "course_id", nullable = false)
    int courseId;
    @Column(name = "created_at", nullable = false)
    String createdAt;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
