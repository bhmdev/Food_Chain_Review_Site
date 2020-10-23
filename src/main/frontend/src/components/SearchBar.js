import React, {useEffect, useState} from "react";
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';

const HomeSearchBar = (props) => {
  const [foodchains, setFoodChains] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [id, setId] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch("/api/v1/foodchains")
      .then((response) => {
        if (response.ok) {
          return response
        } else {
        }
      })
      .then(response => response.json())
      .then(data => setFoodChains(data))
      .catch(error => console.log(error))
  }, [])

  const handleOnSubmit = (event, value) => {
    if(value != null) setId(value.id)
    setShouldRedirect(true)
  }

  const handleInputChange = (event, value) => {
    value.length > 0 ? setOpen(true) : setOpen(false)
  }

  if(shouldRedirect) {
    return <Redirect to={`/foodchains/${id}`}/>
  }

  let newIcon = <SearchIcon/>

  return (
    <>
      <div>
      <Autocomplete
        id="combo-box-demo"
        autoHighlight={true}
        options={foodchains}
        getOptionLabel={(option) => option.name}
        style={{
          width: 700
        }}
        renderInput={(params) => <TextField {...params} placeholder="Search for a Food Chain" variant="outlined"/>}
        onChange={handleOnSubmit}
        onInputChange={handleInputChange}
        size="small"
        popupIcon={newIcon}
        open={open}
      />
        </div>
    </>
  )
}

export default HomeSearchBar;