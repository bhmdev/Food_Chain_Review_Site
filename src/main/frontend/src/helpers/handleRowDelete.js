const handleRowDelete = (oldData, resolve, resource, rowData, setRowData, setIsError) => {
    fetch(`/api/v1/${resource}/${oldData.id}`, {
      method: "DELETE",
      body: JSON.stringify(oldData),
      headers: {"Content-Type": "application/json"}
    })
      .then(result => {
        const dataDelete = [...rowData];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setRowData(dataDelete);
        resolve()
      })
      .catch(errors => {
        console.log(errors)
        setIsError(true)
        resolve()
      })
}
  
export default handleRowDelete