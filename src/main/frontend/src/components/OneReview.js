import React, {useState, useEffect} from 'react';

const OneReview = (props) => {
    const reviewComment = props.comment;
    const reviewRating = props.rating;

    return (
        <div>
            <hr />
            <p><b>Customer Review</b></p>
            <ul>
                <li>{reviewComment}</li>
                <li>{reviewRating}</li>
            </ul>
        </div>
    )
}

export default OneReview