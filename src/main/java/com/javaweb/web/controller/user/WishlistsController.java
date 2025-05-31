package com.javaweb.web.controller;

import com.javaweb.web.entity.Api;
import com.javaweb.web.entity.Wishlists;
import com.javaweb.web.service.WishlistsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Wishlist")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class WishlistsController {
    @Autowired
    WishlistsService wishlistsService;
    @PostMapping
    Api<Wishlists> addWishlist(@RequestBody Wishlists wishlists) {
        return Api.<Wishlists>builder()
                .result(wishlistsService.addWishlists(wishlists))
                .build();
    }
    @GetMapping("/findUser")
    Api<List<Wishlists>> findByUserId(@RequestParam("userId") int userId) {
        return Api.<List<Wishlists>>builder()
                .result(wishlistsService.getWishlistsByUserId(userId))
                .build();
    }
    @GetMapping("findCourse")
    Api<List<Wishlists>> findByCourseId(@RequestParam("courseId") int courseId) {
        return Api.<List<Wishlists>>builder()
                .result(wishlistsService.getWishlistsByCourseId(courseId))
                .build();
    }

}
