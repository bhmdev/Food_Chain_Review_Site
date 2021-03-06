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
    if(!reviewList.isEmpty()) {
      List<Integer> ratings = reviewList.stream().map(Review::getRating)
            .collect(Collectors.toList());
      Double average = ratings.stream().mapToDouble(Integer::doubleValue).average().getAsDouble();
      foodChain.setRating(average);
    }else {
      foodChain.setRating(null);
    }
    return foodChainRepository.save(foodChain);
  }

  public FoodChain update(FoodChain foodChain) {
    FoodChain updateFoodChain = foodChainRepository.findById(foodChain.getId()).get();
    updateFoodChain.setName(foodChain.getName());
    updateFoodChain.setDelivery(foodChain.getDelivery());
    updateFoodChain.setDescription(foodChain.getDescription());
    updateFoodChain.setImgUrl(foodChain.getImgUrl());
    return foodChainRepository.save(updateFoodChain);
  }
}
