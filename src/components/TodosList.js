import React from "react";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TodosList = ({ todos, setTodos, setEditTodo }) => {
  const handleComplete = async (todo) => {
    // PUT: Toggle the completed state
    const updatedTodoResponse = await fetch(
      `http://localhost:8080/todo/complete/${todo._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const updatedTodo = await updatedTodoResponse.json();

    await sleep(1000);

    // GET: Fetch the updated todo list
    const refreshTodoResponse = await fetch(
      `http://localhost:8080/todo?userID=${updatedTodo.userID}`,
      {
        method: "GET",
      }
    );

    const refreshedTodos = await refreshTodoResponse.json();

    // Save the updated todo list
    setTodos([...refreshedTodos]);
  };

  // const handleEdit = ({ id }) => {
  //   const findTodo = todos.find((todo) => todo.id === id);
  //   setEditTodo(findTodo);
  // };

  const handleDelete = async (todo) => {
    // fetch with a DELETE method
    const deletedTodoResponse = await fetch(
      `http://localhost:8080/todo/${todo._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deletedTodo = await deletedTodoResponse.json();

    // GET: Fetch the updated todo list
    const refreshTodoResponse = await fetch(
      `http://localhost:8080/todo?userID=${deletedTodo.userID}`,
      {
        method: "GET",
      }
    );

    const refreshedTodos = await refreshTodoResponse.json();

    // Save the updated todo list
    setTodos(refreshedTodos);
  };

  return (
    <div>
      {todos.map((todo) => (
        <li className="list-item" key={todo.id}>
          <input
            type="text"
            value={todo.text}
            className={`list ${todo.complete ? "complete" : ""}`}
            onChange={(event) => event.preventDefault()}
          />
          <div>
            <button
              className="button-complete task-button"
              onClick={() => handleComplete(todo)}
            >
              <i className="fa fa-check-circle"></i>
            </button>
            {/* <button
              className="button-edit task-button"
              onClick={() => handleEdit(todo)}
            >
              <i className="fa fa-edit"></i>
            </button> */}
            <button
              className="button-delete task-button"
              onClick={() => handleDelete(todo)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default TodosList;
