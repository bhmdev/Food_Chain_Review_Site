import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import StarRatings from 'react-star-ratings';
import Slider from "react-slick";

const FoodChainsContainer = () => {
  const [foodChains, setFoodChains] = useState([]);

  useEffect(() => {
    fetch("/api/v1/foodchains")
      .then((response) => {
        if (response.ok) {
          return response
        } else {
        }
      })
      .then(response => response.json())
      .then(foodChains => setFoodChains(foodChains))
      .catch(error => console.log(error))
  }, [])

  let foodChainList = foodChains.map(foodChain => {
    return (
      <div id="center-index" key={foodChain.id}>
        <Link to={`/foodchains/${foodChain.id}`}><img src={foodChain.imgUrl} height="600" width="600"
                                                      alt="slide 1"/></Link>
        <h3>{foodChain.name}</h3>
        <StarRatings
          rating={foodChain.rating}
          starDimension="30px"
          starSpacing="15px"
          starRatedColor="gold"
        />
      </div>
    )
  })

  var settings = {
    autoplay: true,
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div id="food-chain-carousel-container">
        <h1 id="main-header">Write Something Captivating Here</h1>
        <Slider {...settings}>
          {foodChainList}
        </Slider>
      </div>
    </>
  )
}

export default FoodChainsContainer