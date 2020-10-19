import React, {useState, useEffect} from 'react';
import {forwardRef} from 'react';

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
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
import Alert from '@material-ui/lab/Alert';

const tableIcons = {
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
};

const Table = () => {

  const [foodChainsData, setFoodChainsData] = useState([])
  const [iserror, setIserror] = useState(false)
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

  const handleRowAdd = (newData, resolve) => {
    let errorList = []
    if (newData.delivery === undefined || (newData.delivery !== "true" && newData.delivery !== "false")) {
      errorList.push("Please enter 'true' or 'false' for the delivery field")
    }

    if (newData.imgUrl === undefined) {
      errorList.push("Please enter image Url")
    }

    if (newData.imgUrl === undefined) {
      errorList.push("Please enter image Url")
    }

    console.log("This is the new data")
    console.log(newData)

    if (errorList.length == 0) { //I don't think I will need an ID here...
      fetch('/api/v1/foodchains', {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {"Content-Type": "application/json"}
      })
        .then(result => {
          setFoodChainsData([...foodChainsData, result])
          resolve()
          setErrorMessages([])
          setIserror(false)
        })
        .catch(errors => {
          console.log(errors)
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    let errorList = []
    if (newData.delivery === undefined || (newData.delivery !== "true" && newData.delivery !== "false")) {
      errorList.push("Please enter 'true' or 'false' for the delivery field")
    }

    if (newData.imgUrl === undefined) {
      errorList.push("Please enter image Url")
    }

    if (newData.imgUrl === undefined) {
      errorList.push("Please enter image Url")
    }

    if (errorList.length == 0) {
      fetch('/api/v1/foodchains/' + newData.id, {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {"Content-Type": "application/json"}
      })
        .then(result => {
          const dataUpdate = [...data]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setFoodChainsData(dataUpdate)
          resolve()
          setErrorMessages([])
          setIserror(false)
        })
        .catch(errors => {
          console.log(errors)
          setIserror(true)
          resolve()

        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }

  const handleRowDelete = (oldData, resolve) => {
    console.log("This is supposed to be deleted.")
    fetch('/api/v1/foodchains/' + oldData.id, {
      method: "DELETE",
      body: JSON.stringify(oldData),
      headers: {"Content-Type": "application/json"}
    })
      .then(result => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setFoodChainsData(dataDelete);
        resolve()
      })
      .catch(errors => {
        console.log(errors)
        setIserror(true)
        resolve()
      })
  }

  return (
    <>
      <div>
        {iserror &&
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
        title="Edit, Delete, Update or Add Food Chains"
        icons={tableIcons}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve)
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

export default Table