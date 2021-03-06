import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import OneReview from './OneReview.js';
import StarRating from './StarRatings';
import './App.css'
import starRatings from 'react-star-ratings/build/star-ratings';
import StarRatings from 'react-star-ratings';

Modal.setAppElement('#app')
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
    }, [reviewList.length]);

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
        subtitle.style.color = 'black';
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
      .then(result => {
        setReviewList([...reviewList, result])
        closeModal()
    })
      .catch(errors => console.log(errors))
    }

    const reviews = reviewList.map(singleReview => {
        return <OneReview key={singleReview.id} comment={singleReview.comment} rating={singleReview.rating}/>
    })

    const getRating = value => {
        setRating(value)
    }

    let overallRating;
    if (foodChain.rating != null) {
        overallRating = <StarRatings
            rating={foodChain.rating}
            starDimension="30px"
            starSpacing="15px"
            starRatedColor="gold"
        />
    } else {
        overallRating = <StarRatings
            rating={0}
            starDimension="30px"
            starSpacing="15px"
        />
    }

    return (
        <div className="chain-div">
            {notFoundMessage}
            <br />
            <div className="title-contents">
                <p className="chain-title">{foodChain.name}</p>
            </div>
            <div className="title-contents">
                {overallRating}
            </div>
            <br />
            <br />
            <div className="show-image-wrapper">
                <img className="show-image" src={foodChain.imgUrl}></img>
            </div>
            <br />
            <div id="show-page-description">
              <h5><b>Description:</b></h5>
              <ul>
                <li>{foodChain.description}</li>
              </ul>
              <h6><b>Did they offer delivery in the time before COVID?</b></h6>
              <ul>
                {offersDelivery}
              </ul>
           </div>
            <br />
            <div className="button-container">
                <div className="button-center-stabilizer">
                    <button className="create-review" onClick={openModal}>Add A Review</button>
                    <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <h2 ref={_subtitle => (subtitle = _subtitle)} id="review-form-header">Review Form</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <StarRating getRating={getRating}/>
                        <br></br>
                        <input type="text" name="comment" placeholder="Comment" ref={register} />
                        <input type="hidden" name="rating" value={rating} ref={register}/>
                        <div className="sbutton">
                        <input className="button" type="submit"/></div>
                    </form>
                    </Modal>
                </div>
            </div>
            <br />
            {reviews}
        </div>
    );
}

export default FoodChainShow