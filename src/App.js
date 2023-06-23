import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
    const [todoList, setTodoList] = useState(() => {
        const savedTodoList = localStorage.getItem("savedTodoList");
        return savedTodoList ? JSON.parse(savedTodoList) : [];
    });

    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: { todoList: useState } });
            }, 2000);
        }).then((result) => {
            setTodoList(result.data.todoList);
        });
    }, []);

    useEffect(() => {
        localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }, [todoList]);

    const addTodo = (newTodo) => {
        setTodoList([...todoList, newTodo]);
    };

    const removeTodo = (id) => {
        const newTodoList = todoList.filter((todo) => id !== todo.id);
        setTodoList(newTodoList);
    };

    return (
        <>
            <h1>ToDo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
    );
}

export default App;
