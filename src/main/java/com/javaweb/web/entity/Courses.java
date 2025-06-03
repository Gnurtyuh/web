package com.javaweb.web.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "courses")
@Data

public class Courses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "description", updatable = false, insertable = false)
    private String description;
    @Column(name = "price", updatable = false, insertable = false)
    private BigDecimal price;
    @Column(name = "created_at", updatable = false, insertable = false)
    private Timestamp createdAt;
    @Column(name ="thumbnail_url", nullable = false)
    private String thumbnailUrl;

}
