import React, { useEffect, useState } from "react";

import AddTodoForm from "./AddTodoForm";
import Clock from "./Clock";
import TodoList from "./TodoList";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        };

        try {
            const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            const todos = data.records.map((todo) => {
                return {
                    id: todo.id,
                    title: todo.fields.title,
                };
            });

            setTodoList(todos);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("savedTodoList", JSON.stringify(todoList));
        }
    }, [todoList, isLoading]);

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

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
            <Clock />
        </>
    );
}

export default App;
