import React from 'react';
import { useForm } from 'react-hook-form';

const ReviewForm = props => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    
    return (
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="Comment" placeholder="Comment" ref={register} />
        <input type="range" placeholder="Rating " name="Rating" ref={register({max: 5, min: 0})} />
  
        <input type="submit" />
      </form>
        </div>
    );
  }

  export default ReviewForm
