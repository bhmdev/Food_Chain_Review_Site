import React, {useState, useEffect} from 'react';

const OneReview = (props) => {
    const reviewComment = props.comment;
    const reviewRating = props.rating;

    return (
        <div class="review-wrapper-div">
            <div class="review-div">
                <p><b>Customer Review</b></p>
                <ul>
                    <li>{reviewComment}</li>
                    <li>{reviewRating}</li>
                </ul>
            </div>
        </div>
    )
}

export default OneReview