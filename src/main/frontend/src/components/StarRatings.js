import React, {useState} from 'react';

function StarRating({count, value, 
    inactiveColor='grey',
    size=24,
    activeColor='peachpuff', onChange, onHoveringChange, onMouseIsOut}) {

  const stars = Array.from({length: count}, () => '★')

  const handleChange = (value) => {
    onHoveringChange(value + 1)
  }

  const handleMouseOut = (value) => {
    onMouseIsOut(value)
  }

  const handleClick = (value) => {
    onChange(value + 1)
  }

  return (
    <div onMouseLeave={() => handleMouseOut()}>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style=activeColor;
        }
        return (
          <span className={"star"}  
            key={index}
            style={{color: style, width:size, height:size, fontSize: size, cursor: "pointer"}}
            onMouseOver={() => handleChange(index)}
            onClick={() => handleClick(index)}
          >{s}</span>
        )})}
    </div>
  )
}

function StarRating2(props) {
  const [rating, setRating] = useState(3);
  const [selectedRating, setSelectedRating] = useState(3);
  const [hoveringRating, setHoveringRating] = useState(null)
  const [currentActiveColor, setCurrentActiveColor] = useState("#F4976C")

  const handleChange = (value) => {
    setSelectedRating(value)
    props.getRating(value)
  }

  const handleHoverChange = (value) => {
    setHoveringRating(value)
    setRating(value)
    setCurrentActiveColor("#C37956")
  }

  const handleMouseOut = () => {
    setRating(selectedRating)
    setCurrentActiveColor("#F4976C")
  }

  return (
    <div>
     <StarRating 
       count={5}
       size={40}
       value={rating}
       activeColor ={currentActiveColor}
       inactiveColor={'grey'}
       onChange={handleChange}
       onHoveringChange={handleHoverChange}
       onMouseIsOut={handleMouseOut}
     />
    </div>
  )
}

export default StarRating2