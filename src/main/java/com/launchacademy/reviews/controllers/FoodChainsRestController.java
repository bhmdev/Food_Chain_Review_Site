package com.launchacademy.reviews.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/foodchains")
public class FoodChainsRestController {
    private FoodChainRepository foodChainRepository;

    @Autowired
    public FoodChainRestController(
            FoodChainRepository foodChainRepository) {
        this.foodChainRepository = foodChainRepository;
    }

    @GetMapping
    public Iterable<FoodChain> displayFoodChains() { return foodChainRepository.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity showOneFoodChain(@PathVariable Integer id) {
        Optional<FoodChain> foodChain = foodChainRepository.findById(id);
        if (foodChain.isEmpty()) { //reference
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else { //reference
            return new ResponseEntity(foodChain.get(), HttpStatus.OK);
        }
    }
}