const handleRowAdd = (newData, resolve, resource, rowData, setRowData, setErrorMessages, setIsError, validateData) => {
    let errorList = validateData(newData)
    if (errorList.length == 0) {
      fetch(`/api/v1/${resource}`, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {"Content-Type": "application/json"}
      })
        .then(result => result.json())
        .then(result => {
          setRowData([...rowData, result])
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
  
export default handleRowAdd