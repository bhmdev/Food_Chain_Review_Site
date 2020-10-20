const handleRowUpdate = (newData, oldData, resolve, resource, rowData, setRowData, setErrorMessages, setIsError, validateData) => {
  let errorList = validateData(newData)
  if (resource === "foodchains") {
    newData = {...newData, reviewList: null}
  }

  if (errorList.length == 0) {
    fetch(`/api/v1/${resource}/${newData.id}`, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {"Content-Type": "application/json"}
    })
      .then(result => {
        const dataUpdate = [...rowData]
        const index = oldData.tableData.id
        dataUpdate[index] = newData
        setRowData(dataUpdate)
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

export default handleRowUpdate