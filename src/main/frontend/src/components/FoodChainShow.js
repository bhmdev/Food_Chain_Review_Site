import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import OneReview from './OneReview.js'
import StarRating from './StarRatings';

const FoodChainShow = (props) => {
    let foodChainId = props.match.params.id;
    const [foodChain, setFoodChain] = useState([])
    const [pageFound, setPageFound] = useState(true)
    const [reviewList, setReviewList] = useState([])

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
                setReviewList(foodChain.reviewList)
            })
    }, []);

    let notFoundMessage;
    if (!pageFound) {
        notFoundMessage = <p>Page not found</p>
    }

    let offersDelivery;
    if (foodChain.delivery == true) {
        offersDelivery = <li key={1}>Yes!</li>
    } else {
        offersDelivery = <li key={2}>No. Sad face</li>
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    const [rating, setRating] = useState(0)
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {fetch('/api/v1/reviews/', {
        method: "POST",
        body: JSON.stringify({...data, foodChain:foodChain}),
        headers: {"Content-Type" : "application/json"}
      })
      .then(result => result.json())
      .catch(errors => console.log(errors))
    }
      
    const reviews = reviewList.map(singleReview => {
        return <OneReview key={singleReview.id} comment={singleReview.comment} rating={singleReview.rating}/>
    })

    const getRatingValue = value => {
        setRatingValue(value)
    }

    return (
        <div>
            <div>
                <button onClick={openModal}>Make A Review</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal" >
                    <h2 ref={_subtitle => (subtitle = _subtitle)}>Review Form</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" name="comment" placeholder="comment" ref={register} />
                        <input type="hidden" name="rating" value={rating} ref={register}/>                       
                        <StarRating getRatingValue={getRating}/>
                        <input type="submit" />
                        <button onClick={closeModal}>close</button>
                    </form>
                </Modal>
            </div>
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
            {reviews}
        </div>
    );
}

export default FoodChainShow