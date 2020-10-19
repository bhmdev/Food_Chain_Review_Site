package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.models.FoodChain;
import com.launchacademy.reviews.repositories.FoodChainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/foodchains")
public class FoodChainRestController {
    private FoodChainRepository foodChainRepository;

    @Autowired
    public FoodChainRestController(FoodChainRepository foodChainRepository) {
        this.foodChainRepository = foodChainRepository;
    }

    @GetMapping
    public Iterable<FoodChain> displayFoodChains() {
        return foodChainRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity showOneFoodChain(@PathVariable Integer id) {
        Optional<FoodChain> foodChain = foodChainRepository.findById(id);
        if (foodChain.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity(foodChain.get(), HttpStatus.OK);
        }
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid FoodChain foodChain, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
        }else {
            return new ResponseEntity(foodChainRepository.save(foodChain), HttpStatus.CREATED);
        }
    }

    @PutMapping("/{foodChainId}")
    public ResponseEntity update(@RequestBody FoodChain foodChain, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<List>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
        } else {
            return new ResponseEntity(foodChainRepository.save(foodChain), HttpStatus.OK);
        }
    }
}