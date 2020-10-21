import React, {useState} from 'react';

function StarRating({count, value, 
    inactiveColor='grey',
    size=24,
    activeColor='peachpuff', onChange}) {

  const stars = Array.from({length: count}, () => '★')

  const handleChange = (value) => {
    onChange(value + 1);
  }
  return (
    <div>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style=activeColor;
        }
        return (
          <span className={"star"}  
            key={index}
            style={{color: style, width:size, height:size, fontSize: size}}
            onMouseOver={()=>handleChange(index)}>{s}</span>
        )})}
    </div>
  )
}

function StarRating2(props) {
  const [rating, setRating] = useState(3);

  const handleChange = (value) => {
    setRating(value);
    props.getRating(value)
  }
  return (
    <div>
     <StarRating 
       count={5}
       size={40}
       value={rating}
       activeColor ={'peachpuff'}
       inactiveColor={'grey'}
       onChange={handleChange} />
    </div>
  )
}

export default StarRating2