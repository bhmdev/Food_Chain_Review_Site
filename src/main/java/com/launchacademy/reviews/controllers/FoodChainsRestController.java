package com.launchacademy.reviews.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//need to import models and repositories up here
@RestController
@RequestMapping("api/v1")
public class FoodChainsRestController {
    private FoodChainRepository foodChainRepository;
    @Autowired
    public FoodChainRestController(
            FoodChainRepository foodChainRepository) {
        this.foodChainRepository = foodChainRepository;
    }
    @GetMapping("/foodchains")
    public Iterable<FoodChain> displayFoodChains() { return foodChainRepository.findAll(); }
    @GetMapping("/foodchains/{id}")
    public ResponseEntity showOneFoodChain(@PathVariable Integer id) {
        if (foodChainRepository.findById(id).isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity(foodChainRepository.findById(id).get(), HttpStatus.OK);
        }
    }
}