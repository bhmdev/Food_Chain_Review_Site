package com.launchacademy.reviews.controllers;
import com.launchacademy.reviews.repositories.FoodChainRepository;
import com.launchacademy.reviews.repositories.ReviewRepository;
import com.launchacademy.reviews.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/reviews")
public class ReviewRestController {
    private FoodChainRepository foodChainRepository;
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewRestController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @GetMapping
    public Iterable<Review> displayReviews() {
        return reviewRepository.findAll();
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity update(@RequestBody Review review, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            System.out.println("Something went wrong! Boo");
            return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
        } else {
            System.out.println("Getting it here");
            return new ResponseEntity(reviewRepository.save(review), HttpStatus.OK);
        }
    }
}