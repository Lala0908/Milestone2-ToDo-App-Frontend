import React, { useState } from 'react'
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import TodosList from './components/TodosList';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [state, setState]= useState(false);

  
    return (
    <div className='container'>
      <div className='app-wrapper'>
      <div>
        <Header />
      </div>
      <div>
        <Form 
        input={input}
        setInput={setInput}
        todos={todos}
        setTodos={setTodos}
        />
      </div>
      <div>
        <TodosList todos={todos} setTodos={setTodos} />
      </div>
      </div>
    </div>
    )
  }

            
    



    

  


export default App;