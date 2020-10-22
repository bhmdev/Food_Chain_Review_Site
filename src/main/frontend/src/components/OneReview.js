import React, {useState, useEffect} from 'react';
import StarRatings from 'react-star-ratings';

const OneReview = (props) => {
    const reviewComment = props.comment;
    const reviewRating = props.rating;

    let starRating;
    if (reviewRating != null) {
        starRating = <StarRatings
            rating={reviewRating}
            starDimension="30px"
            starSpacing="15px"
            starRatedColor="gold"
        />
    } else {
        starRating = <StarRatings
        rating={0}
        starDimension="30px"
        starSpacing="15px"
        />
    }

    return (
        <div className="review-wrapper-div">
            <div className="review-div">
                <p><b>Customer Review</b></p>
                {starRating}
                <p>{reviewComment}</p>
            </div>
        </div>
    )
}

export default OneReview