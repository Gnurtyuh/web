package com.javaweb.web.controller.user;

import com.javaweb.web.entity.Courses;
import com.javaweb.web.service.WishlistsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Wishlist")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class WishlistsController {
    @Autowired
    WishlistsService wishlistsService;
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestParam int userId, @RequestParam int courseId) {
        String msg = wishlistsService.addToWishlist(userId, courseId);
        return ResponseEntity.ok(msg);
    }
    @DeleteMapping("/remove")
    public ResponseEntity<String> remove(@RequestParam int userId, @RequestParam int courseId) {
        String msg = wishlistsService.removeFromWishlist(userId, courseId);
        return ResponseEntity.ok(msg);
    }
    @GetMapping("/listCourses")
    public ResponseEntity<List<Courses>> getAll(@RequestParam int userId) {
        return ResponseEntity.ok(wishlistsService.getWishlist(userId));
    }
}
