import PropTypes from "prop-types";
import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";

function TodoList({
    todoList,
    onRemoveTodo,
    onEditTodo,
    editTodoId,
    setEditedText,
}) {
    return (
        <>
            <ul className={style.li}>
                {todoList.map((todo) => (
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        onRemoveTodo={onRemoveTodo}
                        onEditTodo={onEditTodo}
                        isEditing={editTodoId === todo.id}
                        setEditedText={setEditedText}
                    />
                ))}
            </ul>
        </>
    );
}

TodoList.propTypes = {
    todoList: PropTypes.array,
    onRemoveTodo: PropTypes.func,
    onEditTodo: PropTypes.func,
    editTodoId: PropTypes.string,
};

export default TodoList;
