package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.FoodChain;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.repositories.FoodChainRepository;
import com.launchacademy.reviews.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    private ReviewRepository reviewRepository;
    private FoodChainRepository foodChainRepository;
    private FoodChainService foodChainService;

    @Autowired
    private ReviewService(ReviewRepository reviewRepository, FoodChainRepository foodChainRepository,
                          FoodChainService foodChainService) {
        this.reviewRepository = reviewRepository;
        this.foodChainRepository = foodChainRepository;
        this.foodChainService = foodChainService;
    }

    public Review processNewReview(Review review) {
        Review newReview = reviewRepository.save(review);
        foodChainService.setFoodChainRating(foodChainRepository.findByName(review.getFoodChain().getName()));
        return newReview;
    }

    public void processDeletion(Review review) {
        FoodChain foodChain = foodChainRepository.findByName(review.getFoodChain().getName());
        Review deleteReview = reviewRepository.findById(review.getId()).get();
        List<Review> reviewList = foodChain.getReviewList();
        reviewList.remove(deleteReview);
        foodChainService.setFoodChainRating(foodChain);
        reviewRepository.delete(review);
    }
}
