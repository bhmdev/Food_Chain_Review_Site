import React, {useState, useEffect} from 'react';
import {forwardRef} from 'react';

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import Alert from '@material-ui/lab/Alert'; 
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const reviewTableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
}

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
                console.log
                let foodChainsArray = reviews.map((review) => {
                    return {id: review.id, comment: review.comment, rating: review.rating, foodChain: review.foodChain.name}
                }

                );
                setReviewsData(foodChainsArray)
                console.log(foodChainsArray)
            })
            .catch(error => console.log(error))
    }, [])

    const columns = [
        {title: "id", field: "id", hidden: true},
        {title: "Food Chain", field: "foodChain"},
        {title: "Rating", field: "rating"},
        {title: "Comment", field: "comment"}
    ]

    const handleRowUpdate = (newData, oldData, resolve) => {
        let errorList = []
        if (newData.foodChain === undefined) {
            errorList.push("Please make sure a food chain is selected for this review")
        }

        if (newData.rating === undefined) {
            errorList.push("Please make sure review contains a rating")
        }

        if (newData.comment === undefined) {
            errorList.push("Please make sure review contains a comment")
        }

        if (errorList.length == 0) {
            fetch('/api/v1/reviews/' + newData.id, {
                method: "PUT",
                body: JSON.stringify(newData),
                headers: {"Content-Type": "application/json"}
            })
                .then(result => {
                    const dataUpdate = [...reviewsData]
                    const index = oldData.tableData.id
                    dataUpdate[index] = newData
                    setReviewsData(dataUpdate)
                    resolve()
                    setErrorMessages([])
                    setIsError(false)
                })
                .catch(errors => {
                    console.log(errors)
                    setIsError(true)
                    resolve()
                })
        } else {
            setErrorMessages(errorList)
            setIsError(true)
            resolve()
        }
    }

    const handleRowDelete = (oldData, resolve) => {
        console.log("DELETE method")
        fetch('/api/v1/reviews/' + oldData.id, {
            method: "DELETE",
            body: JSON.stringify(oldData),
            headers: {"Content-Type": "application/json"}
        })
            .then(result => {
                const dataDelete = [...reviewsData];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setReviewsData(dataDelete);
                resolve()
            })
            .catch(errors => {
                console.log(errors)
                setIsError(true)
                resolve()
            })
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
                title="Update, Delete, or Add Reviews"
                icons={reviewTableIcons}
                options={{
                    pageSize: 10
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        }),
                }}
            />
        </>

    )
}

export default ReviewTable