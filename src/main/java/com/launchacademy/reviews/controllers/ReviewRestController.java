package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.repositories.FoodChainRepository;
import com.launchacademy.reviews.repositories.ReviewRepository;
import com.launchacademy.reviews.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1/reviews")
public class ReviewRestController {
    private FoodChainRepository foodChainRepository;
    private ReviewRepository reviewRepository;
    private ReviewService reviewService;

    @Autowired
    public ReviewRestController(ReviewRepository reviewRepository, FoodChainRepository foodChainRepository,
                                ReviewService reviewService) {
        this.foodChainRepository = foodChainRepository;
        this.reviewRepository = reviewRepository;
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity create(@RequestParam Integer foodChainId, @RequestBody @Valid Review review, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
        } else {
            return new ResponseEntity(reviewService.processReview(review, foodChainId), HttpStatus.CREATED);
        }
    }
}