import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState("");

    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo({
            title: todoTitle,
            id: Date.now(),
        });
        setTodoTitle("");
    };

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel
                id="todoTitle"
                name="title"
                type="text"
                value={todoTitle}
                onChange={handleTitleChange}
            ></InputWithLabel>
            Title
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;
