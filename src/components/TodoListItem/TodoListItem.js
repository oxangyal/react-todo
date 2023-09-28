import PropTypes from "prop-types";
import React from "react";
import iconCancel from "../../assets/cancel30.png";
import iconDelete from "../../assets/delete48.png";
import iconSave from "../../assets/save30.png";
import style from "./TodoListItem.module.css";

// import iconEdit from "../../assets/edit30.png";

function TodoListItem({
    todo,
    onRemoveTodo,
    onEditTodo,
    isEditing,
    onSave,
    onCancel,
    editedText,
    setEditedText,
})

{
    const date = new Date(todo.createdTime);
    const dateString = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
    return (
        <div>
            <li>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => onSave(todo.id)}
                            className={style.ButtonSave}
                        >
                            <img src={iconSave} alt="Save Icon" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onCancel()}
                            className={style.ButtonCancel}
                        >
                            <img src={iconCancel} alt="Cancel Icon" />
                        </button>
                    </>
                ) : (
                    <>
                        {todo.title}
                        <span className={style.todoDate}>
                                {dateString}
                        </span>
                        <button
                            type="button"
                            onClick={() => onRemoveTodo(todo.id)}
                            className={style.ButtonDelete}
                        >
                            <img src={iconDelete} alt="Delete Icon" />
                        </button>
                        {/* <button
                            type="button"
                            onClick={() => onEditTodo(todo.id)}
                            className={style.ButtonEdit}
                        >
                            <img src={iconEdit} alt="Edit Icon" />
                        </button> */}
                    </>
                )}
            </li>
        </div>
    );
}

TodoListItem.propTypes = {
    todo: PropTypes.object,
    onRemoveTodo: PropTypes.func,
    onEditTodo: PropTypes.func,
    isEditing: PropTypes.bool,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

export default TodoListItem;
