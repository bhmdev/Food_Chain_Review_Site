package com.launchacademy.reviews.controllers;
import com.launchacademy.reviews.repositories.ReviewRepository;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/reviews")
public class ReviewRestController {
    private ReviewRepository reviewRepository;
    private ReviewService reviewService;

    @Autowired
    public ReviewRestController(ReviewRepository reviewRepository, ReviewService reviewService) {
        this.reviewRepository = reviewRepository;
        this.reviewService = reviewService;
    }

    @GetMapping
    public Iterable<Review> displayReviews() {
        return reviewRepository.findAllByOrderById();
    }

    @GetMapping("/{id}")
    public ResponseEntity showOneFoodChain(@PathVariable Integer id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (review.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity(review.get(), HttpStatus.OK);
        }
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid Review review, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
        } else {
            return new ResponseEntity(reviewService.processNewReview(review), HttpStatus.CREATED);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@RequestBody @Valid Review review, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
        } else {
            return new ResponseEntity(reviewRepository.save(review), HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@RequestBody @Valid Review review, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
        } else {
            reviewService.processDeletion(review);
            return new ResponseEntity(HttpStatus.OK);
        }
    }
}