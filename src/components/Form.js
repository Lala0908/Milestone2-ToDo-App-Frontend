import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {

    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? { title, id, completed } : todo
        )
        setTodos(newTodo);
        setEditTodo("");
    };
    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("")
        }
    }, [setInput, editTodo]);
    const onInputChange = (event) => {
        setInput(event.target.value);
        setInput = ("")
    };
    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!editTodo) {
            setTodos([...todos, {id: uuidv4(), title: input, complete: false}]);
            fetch("http://localhost:8080/todos", {
                method: "POST",
                body: { text: input, complete: false }




            }).then((response) => {
                console.log("todoCreated")
            });

            setInput("");
        } else {
            updateTodo(input, editTodo.id, editTodo.completed)

            fetch("http://localhost:8080/todos/:IDHERE", {
                method: "PUT",
                body: {
                    todo: "VARIABLE to get data from form event... event.input.todo",
                }
            }).then((response) => {
                // refresh page or redirect to homepage


                // FOR GET:
                // response.data.todos foreach loop 
            });
        }

    };
    return (
        <form onSubmit={onFormSubmit}>
            <input
                type='text'
                placeholder='Enter a Todo...'
                calssName='task-input'
                value={input}
                required onChange={onInputChange} />
            <button className='button-add' type='submit'>
                {editTodo ? "OK" : "Add"}
            </button>
        </form>

    )
}

export default Form;