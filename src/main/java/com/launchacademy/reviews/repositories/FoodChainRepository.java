package com.launchacademy.reviews.repositories;

import com.launchacademy.reviews.models.FoodChain;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodChainRepository extends CrudRepository<FoodChain, Integer> {
  FoodChain findByName(String name);
  Iterable<FoodChain> findAllByOrderByName();
}
