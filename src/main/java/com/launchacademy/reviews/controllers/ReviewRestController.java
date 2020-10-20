package com.launchacademy.reviews.controllers;
import com.launchacademy.reviews.repositories.FoodChainRepository;
import com.launchacademy.reviews.repositories.ReviewRepository;
import com.launchacademy.reviews.models.Review;
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
            return new ResponseEntity(reviewRepository.save(review), HttpStatus.CREATED);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@RequestBody @Valid Review review, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
        } else {
            System.out.println("Edited!! Or was it......");
            return new ResponseEntity(reviewRepository.save(review), HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@RequestBody @Valid Review review, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
        } else {
            System.out.println("Deleting!");
            reviewRepository.delete(review);
            return new ResponseEntity(HttpStatus.OK);
        }
    }

}