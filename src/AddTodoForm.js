import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); //Error message for an empty Todo entry

    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
        setErrorMessage("");
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        if (todoTitle === "") {  //Preventing empty Todo entry
            setErrorMessage("Add new task");
        } else {
            onAddTodo({
                title: todoTitle,
                id: Date.now(),
            });
            setTodoTitle("");
        }
    };

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel
                id="todoTitle"
                name="title"
                type="text"
                value={todoTitle}
                onChange={handleTitleChange}
            />
            <p>{errorMessage}</p>
            <p>Title</p>
            <button type="submit">Add</button>
            
        </form>
    );
}

export default AddTodoForm;
