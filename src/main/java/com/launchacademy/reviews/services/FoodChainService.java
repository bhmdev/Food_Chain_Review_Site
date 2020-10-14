package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.FoodChain;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.repositories.FoodChainRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodChainService {

  private FoodChainRepository foodChainRepository;

  @Autowired
  public FoodChainService(FoodChainRepository foodChainRepository) {
    this.foodChainRepository = foodChainRepository;
  }

  public FoodChain setFoodChainRating(FoodChain foodChain) {
    List<Review> reviewList = foodChain.getReviewList();
    List<Integer> ratings = reviewList.stream().map(Review::getRating)
        .collect(Collectors.toList());
    Double average = ratings.stream().mapToDouble(Integer::doubleValue).average().getAsDouble();
    foodChain.setRating(average);
    return foodChainRepository.save(foodChain);
  }
}
