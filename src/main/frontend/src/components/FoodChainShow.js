import React, {useState, useEffect} from 'react'

const FoodChainShow = (props) => {
    let foodChainId = props.match.params.id;
    const [foodChain, setFoodChain] = useState([])
    const [reviews, setReviews] = useState([])
    const [applicationStatus, setApplicationStatus] = useState("");
    const [pageFound, setPageFound] = useState(true);

    useEffect(() => {
        fetch(`/api/v1/foodchains/${foodChainId}`)
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    setPageFound(false);
                }
            })
            .then(result => result.json())
            .then(foodChain => {
                setFoodChain(foodChain)
                setReviews(foodChain.reviewList.map(review => {
                    return <div>{review.comment}<br></br>{review.rating}<br></br></div>
                })
                )
            })
    }, []);

    let notFoundMessage;
    if (!pageFound) {
        notFoundMessage = <p>Page not found</p>
    }

    let offersDelivery;
    if (foodChain.delivery == true) {
        offersDelivery = <li>Yes!</li>
    } else {
        offersDelivery = <li>No. Sad face</li>
    }

    return (
        <div>
            {notFoundMessage}
            <h1>Look at this amazing food chain? Don't you want to eat here.</h1>
            <br></br>
            <h3>Restaurant Name:</h3>
                <ul>
                    <li>{foodChain.name}</li>
                </ul>
            <img src={foodChain.imgUrl}></img>
            <p>Description:</p>
                <ul>
                    <li>{foodChain.description}</li>
                </ul>
            <p>Rating:</p>
                <ul>
                    <li>{foodChain.rating}</li>
                </ul>
            <p>Did they offer delivery in the time before COVID?</p>
                <ul>
                    {offersDelivery}
                </ul>
            <p>List of Reviews:</p>
            <p>{reviews}</p>
        </div>
    );
}

export default FoodChainShow