import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import Alert from '@material-ui/lab/Alert';
import TableIcons from '../helpers/TableIcons'
import handleRowDelete from '../helpers/handleRowDelete'
import handleRowUpdate from '../helpers/handleRowUpdate'

const ReviewTable = () => {
    const [reviewsData, setReviewsData] = useState([])
    const [isError, setIsError] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        fetch("/api/v1/reviews")
            .then((response) => {
                if (response.ok) {
                    return response
                }
            })
            .then(response => response.json())
            .then(reviews => {
                setReviewsData(reviews)
            })
            .catch(error => console.log(error))
    }, [])

    const columns = [
        {title: "id", field: "id", hidden: true},
        {title: "Food Chain", render: reviewsData => reviewsData.foodChain.name},
        {title: "Rating", field: "rating"},
        {title: "Comment", field: "comment"}
    ]

    const validateData = newData => {
        console.log("getting in here?")
        let errorList = []
        if (newData.rating === "") {
            errorList.push("Please enter a valid rating")
        }
        if (newData.comment === "") {
            errorList.push("Please enter a valid comment")
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
                data={reviewsData}
                title="UPDATE or DELETE Reviews"
                icons={TableIcons}
                options={{
                    pageSize: 10
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve, "reviews", reviewsData, setReviewsData, setErrorMessages, setIsError, validateData);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve, "reviews", reviewsData, setReviewsData, setIsError);
                        }),
                }}
            />
        </>

    )
}

export default ReviewTable