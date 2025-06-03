package com.javaweb.web.service;

import com.javaweb.web.entity.Topups;
import com.javaweb.web.repository.TopupsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public Topups updateTopups(int id,Topups topups) {
        if (topupsRepo.findById(id).orElseThrow(() -> new RuntimeException("Topups Not Found")) != null) {
            userService.increaseBalance(topups.getUser().getId(), topups.getAmount());
            return topupsRepo.save(topups);
        }
        return null;
    }
    public void deleteTopups(int id) {
        topupsRepo.deleteById(id);
    }
    public List<Topups> findByUserId(int userId) {
        return topupsRepo.findByUserId(userId);
    }
}
