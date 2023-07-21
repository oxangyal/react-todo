import "./TodoContainer.module.css";

import { useEffect, useState } from "react";

import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoList from "../TodoList/TodoList";

const TodoContainer = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //Fetch  API, get data from Airtable

    const fetchData = async () => {
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
                throw new Error(`Error ${response.status}`);
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
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("savedTodoList", JSON.stringify(todoList));
        }
    }, [todoList, isLoading]);

    //Post (add) new Todo to airtable

    const addTodo = async (title) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
            body: JSON.stringify({
                fields: {
                    title: title.title,
                },
            }),
        };
        try {
            const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const todo = await response.json();
            const newTodo = {
                id: todo.id,
                title: title.title,
            };
            setTodoList([...todoList, newTodo]);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    // function addTodo(newTodo) {
    //     const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    //     fetch(url, {
    //         method: "POST",
    //         headers: {
    //             Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             fields: {
    //                 title: newTodo.title,
    //             },
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const newTodo = {
    //                 id: data.id,
    //                 title: data.fields.title,
    //                 completedAt: data.fields.completedAt,
    //             };

    //             setTodoList([...todoList, newTodo]);
    //         })
    //         .catch((error) => console.error(error));
    // }

    //Delete (remove) Todo from airtable

    const removeTodo = async (id) => {
        try {
            setTodoList(todoList.filter((todo) => todo.id !== id));
            const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;

            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                },
            });

            if (response.ok) {
                const filteredList = todoList.filter((data) => data.id !== id);
                setTodoList(filteredList);
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const removeTodo = (id) => {
    //     setTodoList(todoList.filter((todo) => todo.id !== id));
    //     const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;

    //     fetch(url, {
    //         method: "DELETE",
    //         headers: {
    //             Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const filteredList = todoList.filter((data) => data.id !== id);
    //             setTodoList(filteredList);
    //         })
    //         .catch((error) => console.error(error));
    // };

    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
        </>
    );
};

export default TodoContainer;
