package com.javaweb.web.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "topups")
@Data
public class Topups {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private Users user;
    @Column(name = "amount", updatable = false, insertable = false)
    private BigDecimal amount;
    @Column(name = "status", updatable = false, insertable = false)
    private String status;
    @Column(name = "created_at", updatable = false, insertable = false)
    private Timestamp createdAt;
    @Column(name = "reference_code", updatable = false, insertable = false)
    private String referenceCode;
}
