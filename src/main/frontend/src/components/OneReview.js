import React, {useState, useEffect} from 'react';

const OneReview = (props) => {
    const [chainReview, setChainReview] = useState([]);
    const [reviewFound, setReviewFound] = useState(true);
    const reviewId = props.id;
    const reviewComment = props.comment;
    const reviewRating = props.rating;

    useEffect(() => {
        fetch(`/api/v1/reviews/${reviewId}`)
            .then((response) => {
                if (response.ok) {
                    return response
                } else {
                    setReviewFound(false);
                }
            })
            .then(response => response.json())
            .then(chainReview => setChainReview(chainReview))
            .catch(error => console.log(error))
    }, [])

    let reviewNotFoundMessage;
    if (!reviewFound) {
        reviewNotFoundMessage = <p>Review not found :(</p>
    }

    return (
        <div>
            {reviewNotFoundMessage}
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