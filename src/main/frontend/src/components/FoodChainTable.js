import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import Alert from '@material-ui/lab/Alert';
import TableIcons from "../helpers/TableIcons";
import handleRowDelete from "../helpers/handleRowDelete";
import handleRowUpdate from "../helpers/handleRowUpdate";
import handleRowAdd from "../helpers/handleRowAdd";

  const FoodChainTable = () => {
  const [foodChainsData, setFoodChainsData] = useState([])
  const [isError, setIsError] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    fetch("/api/v1/foodchains")
      .then((response) => {
        if (response.ok) {
          return response
        }
      })
      .then(response => response.json())
      .then(foodChains => setFoodChainsData(foodChains))
      .catch(error => console.log(error))
  }, [])

  const columns = [
    {title: "id", field: "id", hidden: true},

    {title: "Name", field: "name"},
    {title: "Rating", field: "rating", editable: "never"},
    {title: "Delivery", field: "delivery"},
    {title: "Description", field: "description"},
    {title: "Image Url", field: "imgUrl"},
    {title: "Review list", field: "reviewList", hidden: true}
  ]

  const validateData = newData => {
    let errorList = []
    if (newData.delivery !== "true" && newData.delivery !== "false") {
      errorList.push("Please enter 'true' or 'false' for the delivery field")
    }

    if (newData.name === "") {
      errorList.push("Please enter image Url")
    }

    if (newData.imgUrl === "") {
      errorList.push("Please enter image Url")
    }
    return errorList
  }

  return (
    <>
      <div>
        {isError &&
        <Alert severity="error">
          {errorMessages.map((msg, i) => {
            return <div key={i}>{msg}</div>
          })}
        </Alert>
        }
      </div>
      <MaterialTable
        columns={columns}
        data={foodChainsData}
        title="Edit, Delete, or Add Food Chains"
        icons={TableIcons}
        options={{
          pageSize: 10
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve, "foodchains", foodChainsData,
                setFoodChainsData, setErrorMessages, setIsError, validateData);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve, "foodchains", foodChainsData, setFoodChainsData,
                setErrorMessages,setIsError, validateData)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve, "foodchains", foodChainsData, setFoodChainsData, setIsError)
            }),
        }}
      />
    </>
  )
}

export default FoodChainTable

