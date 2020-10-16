package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.FoodChain;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.repositories.FoodChainRepository;
import com.launchacademy.reviews.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    private FoodChainRepository foodChainRepository;
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, FoodChainRepository foodChainRepository) {
        this.reviewRepository = reviewRepository;
        this.foodChainRepository = foodChainRepository;
    }

    public Review processReview(Review review, Integer foodChainId) {
        FoodChain foodChain = foodChainRepository.findById(foodChainId).get();
        review.setFoodChain(foodChain);
        return reviewRepository.save(review);
    }
}
