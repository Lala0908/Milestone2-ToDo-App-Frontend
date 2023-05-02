import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const Form =({input, setInput, todos, setTodos}) => {
    const onInputChange =  (event) => {
        setInput(event.target.value);
        setInput=("")
    };
    const onFormSubmit = (event) => {
        event.preventDefault();
        setTodos([...todos, {id: uuidv4(), title: input, complete: false}]);
        setInput("")
      
    }
  return (
    <form onSubmit={onFormSubmit}>
        <input 
        type='text' 
        placeholder='Enter a Todo...' 
        calssName='task-input' 
        value={input} 
        required onChange={onInputChange}/>
        <button className='button-add' type='submit'>
            Add
        </button>
    </form>
    
  )
}

export default Form;