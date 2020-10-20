import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import StarRating from './StarRatings';

const FoodChainShow = (props) => {
    let foodChainId = props.match.params.id;
    const [foodChain, setFoodChain] = useState([])
    const [reviews, setReviews] = useState([])
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
                    return <div key={review.id}>{review.comment}<br></br>{review.rating}<br></br></div>
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
    const [ratingValue, setRatingValue] = useState(0)
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);

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
                        <input type="text" name="Comment" placeholder="Comment" ref={register} />
                        <input type="hidden" name="ratingValue" value={ratingValue} ref={register}/>                       
                        <StarRating getRatingValue={getRatingValue}/>
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