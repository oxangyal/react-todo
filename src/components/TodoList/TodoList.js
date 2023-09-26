import PropTypes from "prop-types";
import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";

function TodoList({ todoList, onRemoveTodo }) {
    return (
        <>
            <ul className={style.li}>
                {todoList.map((todo) => (
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        onRemoveTodo={onRemoveTodo}
                    />
                ))}
            </ul>
        </>
    );
}

TodoList.propTypes = {
    todoList: PropTypes.array,
    onRemoveTodo: PropTypes.func,
};

export default TodoList;
