import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const useSemiPersistentState = () => {
    const [todoList, setTodoList] = useState(() => {
        const savedTodoList = localStorage.getItem("savedTodoList");
        return savedTodoList ? JSON.parse(savedTodoList) : [];
    });

    useEffect(() => {
        localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }, [todoList]);
    return [todoList, setTodoList];
};
function App() {
    const [todoList, setTodoList] = useSemiPersistentState();

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
