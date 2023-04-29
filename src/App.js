import React, { useState } from 'react'

function App() {

  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  return (
    <div>
      <h1>Todo List</h1>
      <input
      type="text"
      value={input}
      />
      <button>Add</button>
      <button>Delete</button>


    </div>

  )
}

export default App