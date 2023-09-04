import React, { useState } from "react";

import InputWithLabel from "./InputWithLabel";
import iconPlus from "../../assets/plus48.png";
import style from "./AddTodoForm.module.css";

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
        <form onSubmit={handleAddTodo} className={style.AddTodoForm}>
                <InputWithLabel
                    id="todoTitle"
                    name="title"
                    type="text"
                    value={todoTitle}
                    onChange={handleTitleChange}
                />
                <p className={style.ErrorMsg}>{errorMessage}</p>
                {/* <p>Title</p> */}
                <button type="submit" className={style.ButtonAdd}>
                    <img src={iconPlus} alt="Add Icon" />
                </button>
        </form>
    );
}

export default AddTodoForm;
