package com.javaweb.web.repository;

import com.javaweb.web.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepos extends JpaRepository<Admin, Long> {
    @Query
    Admin findByUsername(String username);
}
