import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import OneReview from './OneReview.js';
import StarRating from './StarRatings';
import './App.css'

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
    }, [reviewList]);

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

    return (
        <div class="chain-div">
        <div>
            <div>
                <button onClick={openModal}>Make A Review</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <h2 ref={_subtitle => (subtitle = _subtitle)}>Review Form</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" name="comment" placeholder="comment" ref={register} />
                        <input type="hidden" name="rating" value={rating} ref={register}/>                       
                        <StarRating getRating={getRating}/>
                        <br></br>
                        <div className="sbutton">
                        <input className="button" type="submit"/></div>
                    </form>
                </Modal>
            </div>
            {notFoundMessage}
            <br />
            <div class="chain-name">
                <p class="chain-title">{foodChain.name}</p>
            </div>
            <br />
            <img src={foodChain.imgUrl}></img>
            <hr />
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
            {reviews}
            <br />
            <div class="button-container">
                <div class="button-center-stabilizer">
                    <button class="create-review" onClick={openModal}>Add A Review</button>
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
                            <StarRating getRating={getRating}/>
                            <input type="submit" />
                            <button onClick={closeModal}>close</button>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default FoodChainShow