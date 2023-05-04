import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({
  input,
  setInput,
  todos,
  setTodos,
  editTodo,
  setEditTodo,
  userID,
  setUserID,
}) => {
  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (event) => {
    setInput(event.target.value);
    setInput = "";
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    if (!editTodo) {
      // POST: Create a new todo
      const newTodoResponse = await fetch("http://localhost:8080/todo", {
        method: "POST",
        body: JSON.stringify({
          text: input,
          complete: false,
          userID: userID || undefined,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newTodo = await newTodoResponse.json();

      // If this is the first todo, save the user ID
      if (!userID) {
        setUserID(newTodo.userID);
      }

      // GET: Fetch the updated todo list
      const refreshTodoResponse = await fetch(
        `http://localhost:8080/todo?userID=${newTodo.userID}`,
        {
          method: "GET",
        }
      );
      const refreshedTodos = await refreshTodoResponse.json();

      // Save the updated todo list
      setTodos(refreshedTodos);

      // Clear the input
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter a Todo..."
        calssName="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        {editTodo ? "OK" : "Add"}
      </button>
    </form>
  );
};

export default Form;
