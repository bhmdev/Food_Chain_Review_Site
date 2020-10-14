package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.models.FoodChain;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.repositories.FoodChainRepository;
import com.launchacademy.reviews.repositories.ReviewRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReviewSeeder {

  private FoodChainRepository foodChainRepository;
  private ReviewRepository reviewRepository;

  @Autowired
  public ReviewSeeder(FoodChainRepository foodChainRepository, ReviewRepository reviewRepository) {
    this.foodChainRepository = foodChainRepository;
    this.reviewRepository = reviewRepository;
  }

  public void seed() {
    FoodChain pandaExpress = foodChainRepository.findByName("Panda Express");
    FoodChain chipotle = foodChainRepository.findByName("Chipotle");
    FoodChain mcdonalds = foodChainRepository.findByName("McDonalds");
    FoodChain appleBees = foodChainRepository.findByName("Applebees");
    FoodChain fiveGuys = foodChainRepository.findByName("Five Guys");
    FoodChain timHortons = foodChainRepository.findByName("Tim Hortons");
    FoodChain chickfila = foodChainRepository.findByName("Chick-Fil-A");

    List<Review> reviews = new ArrayList<>();

    Review pandaExpressReview1 = new Review();
    pandaExpressReview1.setComment("I love this food!");
    pandaExpressReview1.setRating(5);
    pandaExpressReview1.setFoodChain(pandaExpress);
    reviews.add(pandaExpressReview1);

    Review pandaExpressReview2 = new Review();
    pandaExpressReview2.setComment("Omg so gross");
    pandaExpressReview2.setRating(1);
    pandaExpressReview2.setFoodChain(pandaExpress);
    reviews.add(pandaExpressReview2);

    Review chipotleReview1 = new Review();
    chipotleReview1.setComment("Eh, it's alright.");
    chipotleReview1.setRating(3);
    chipotleReview1.setFoodChain(chipotle);
    reviews.add(chipotleReview1);

    Review chipotleReview2 = new Review();
    chipotleReview2.setComment("Their chicken quesadilla is the best!!");
    chipotleReview2.setRating(4);
    chipotleReview2.setFoodChain(chipotle);
    reviews.add(chipotleReview2);

    Review mcdonaldsReview1 = new Review();
    mcdonaldsReview1.setComment("Best fries in the world!");
    mcdonaldsReview1.setRating(5);
    mcdonaldsReview1.setFoodChain(mcdonalds);
    reviews.add(mcdonaldsReview1);

    Review mcdonaldsReview2 = new Review();
    mcdonaldsReview2.setComment("I like it, but Burger King is better.");
    mcdonaldsReview2.setRating(3);
    mcdonaldsReview2.setFoodChain(mcdonalds);
    reviews.add(mcdonaldsReview2);

    Review applebeesReview1 = new Review();
    applebeesReview1.setComment("I love their buffalo chicken appetizers!");
    applebeesReview1.setRating(4);
    applebeesReview1.setFoodChain(appleBees);
    reviews.add(applebeesReview1);

    Review applebeesReview2 = new Review();
    applebeesReview2.setComment("Their pasta is the bomb!");
    applebeesReview2.setRating(2);
    applebeesReview2.setFoodChain(appleBees);
    reviews.add(applebeesReview2);

    Review fiveGuysReview1 = new Review();
    fiveGuysReview1.setComment("Have a crazy combination of burgers!");
    fiveGuysReview1.setRating(4);
    fiveGuysReview1.setFoodChain(fiveGuys);
    reviews.add(fiveGuysReview1);

    Review fiveGuysReview2 = new Review();
    fiveGuysReview2.setComment("It's a step above McDonalds burgers.  They're alright.");
    fiveGuysReview2.setRating(2);
    fiveGuysReview2.setFoodChain(fiveGuys);
    reviews.add(fiveGuysReview2);

    Review timHortonsReview1 = new Review();
    timHortonsReview1.setComment("The Iced Capp is the best invention on earth!");
    timHortonsReview1.setRating(5);
    timHortonsReview1.setFoodChain(timHortons);
    reviews.add(timHortonsReview1);

    Review timHortonsReview2 = new Review();
    timHortonsReview2.setComment("Dunkin donuts is better!");
    timHortonsReview2.setRating(1);
    timHortonsReview2.setFoodChain(timHortons);
    reviews.add(timHortonsReview2);

    Review chickfilaReview1 = new Review();
    chickfilaReview1.setComment("I literally go there so I can get the chick-fil-a sauce so I can eat it with all of my food.");
    chickfilaReview1.setRating(5);
    chickfilaReview1.setFoodChain(chickfila);
    reviews.add(chickfilaReview1);

    Review chickfilaReview2 = new Review();
    chickfilaReview2.setComment("I LOOOOOOOOOOVVVVEEE their chicken sandwich!");
    chickfilaReview2.setRating(4);
    chickfilaReview2.setFoodChain(chickfila);
    reviews.add(chickfilaReview2);

    for (Review review: reviews) {
      reviewRepository.save(review);
    }
  }
}
