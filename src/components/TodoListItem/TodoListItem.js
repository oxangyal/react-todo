import React from "react";
import iconDelete from "../../assets/delete48.png";
import style from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo }) {
    return (
        <li>
            {todo.title}
            <button type="button" onClick={() => onRemoveTodo(todo.id)}
                className={style.ButtonDelete}>
                <img src={iconDelete} alt="Delete Icon" />
            </button>
        </li>
    );
}

export default TodoListItem;
