package com.javaweb.web.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "topups")
public class Topups {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    @Column(name = "user_id", nullable = false)
    int userId;
    @Column(name = "amount", nullable = false)
    BigDecimal amount;
    @Column(name = "status", nullable = false)
    String status;
    @Column(name = "created_at", nullable = false)
    String createdAt;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
