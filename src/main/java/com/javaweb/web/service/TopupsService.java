package com.javaweb.web.service;

import com.javaweb.web.entity.Topups;
import com.javaweb.web.repository.TopupsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopupsService {
    @Autowired
    private TopupsRepo topupsRepo;
    @Autowired
    private UsersService userService;
    public Topups addTopups(Topups topups) {
        return topupsRepo.save(topups);
    }
    public List<Topups> getAllTopups() {
        return topupsRepo.findAll();
    }
    public Topups getTopupsById(int id) {
        return topupsRepo.findById(id).orElseThrow(() -> new RuntimeException("Topups Not Found"));
    }
    public boolean updateTopups(int id, String status) {
        Optional<Topups> optional = topupsRepo.findById(id);
        if (!optional.isPresent()) return false;
        Topups topups = optional.get();
        userService.increaseBalance(topups.getUser().getId(), topups.getAmount());
        topupsRepo.save(topups);
        return true;
    }
    public void deleteTopups(int id) {
        topupsRepo.deleteById(id);
    }
    public List<Topups> findByUserId(int userId) {
        return topupsRepo.findByUserId(userId);
    }
}
