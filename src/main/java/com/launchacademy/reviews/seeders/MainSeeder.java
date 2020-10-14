package com.launchacademy.reviews.seeders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MainSeeder implements CommandLineRunner {

  private FoodChainSeeder foodChainSeeder;
  private ReviewSeeder reviewSeeder;

  @Autowired
  private MainSeeder(FoodChainSeeder foodChainSeeder, ReviewSeeder reviewSeeder) {
    this.foodChainSeeder = foodChainSeeder;
    this.reviewSeeder = reviewSeeder;
  }

  @Override
  public void run(String... args) throws Exception {
    foodChainSeeder.seed();
    reviewSeeder.seed();
  }
}
