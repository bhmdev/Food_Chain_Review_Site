package com.launchacademy.reviews.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotBlank;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "food_chains")
public class FoodChain {
  @Id
  @SequenceGenerator(name="food_chain_generator", sequenceName="food_chains_id_seq", allocationSize = 1)
  @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="food_chain_generator")
  @Column(name="id", nullable=false, unique=true)
  private Integer id;

  @NotBlank
  @Column(nullable = false)
  private String name;

  @Column(columnDefinition = "NUMERIC(2,1)" )
  private Double rating;

  @NotNull
  @Column(nullable = false)
  private Boolean delivery;

  @Column
  private String description;

  @NotBlank
  @Column(name = "img_url", nullable = false)
  private String imgUrl;

  @OneToMany(mappedBy = "foodChain", cascade = CascadeType.ALL)
  @JsonIgnoreProperties("foodChain")
  private List<Review> reviewList;
}
