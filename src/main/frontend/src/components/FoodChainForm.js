import React, { useState } from 'react';
import _ from "lodash"

const FoodChainForm = props => {
  const emptyFoodChain = {
    name: "",
    description: "",
    delivery: "",
    imgUrl: ""
  }
  const [newFoodChain, setNewFoodChain] = useState(emptyFoodChain);
  const [errors, setErrors] = useState({})

  let requiredFields = {
    name: "Name",
    delivery: "delivery",
    imgUrl: "imgUrl"
  }

  const handleInputChange = event => {
    setNewFoodChain({
      ...newFoodChain,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const clearForm = () => {
    setNewFoodChain(emptyFoodChain);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let formErrors = {}
    for (let field of Object.keys(requiredFields)) {
      if (newFoodChain[field].trim() === "") {
        formErrors = {
          ...formErrors,
          [field] : `${requiredFields[field]} cannot be blank`
        }
      }
    }

    let payloadDelivery = newFoodChain.delivery == "Y" ? "true" : "false"

    let payload = {...newFoodChain,
    delivery: payloadDelivery,
    rating: null,
    reviewList: []}

    if (_.isEmpty(formErrors)) {
      fetch('/api/v1/foodchains', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {"Content-Type" : "application/json"}
      })
        .then(result => setNewFoodChain(emptyFoodChain))
        .catch(errors => console.log(errors))
    } else setErrors(formErrors)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form callout medium-8 cell">
      <h2>Food Chain Form</h2>
      <p className="error">{errors.name}</p>
      <label>Food Chain Name
        <input
          type="text"
          name="name"
          placeholder="McDonald's"
          value={newFoodChain.name}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor= "delivery">Delivery
        <select name="delivery"
          value={newFoodChain.delivery}
          onChange={handleInputChange}>
          <option value="" hidden>Choose a delivery option</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>
         </select>
      </label>
      <label>Description
        <input
          type="text"
          name="description"
          placeholder="The Golden Arches"
          value={newFoodChain.description}
          onChange={handleInputChange}
        />
      </label>
      <label>Image Url
        <input
        type="text"
        name="imgUrl"
        placeholder="https://www.readersdigest.ca/wp-content/uploads/2018/01/banned-mcdonalds.jpg"
        value={newFoodChain.imgUrl}
        onChange={handleInputChange}>
        </input>
      </label>
      <div className="button-group">
        <input className="button" type="submit" value="Submit" />
        <button className="button" id="clear-button" value="Clear Form" onClick={clearForm}>Clear</button>
      </div>
    </form>
  </div>
  )
 }
export default FoodChainForm
