import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useState } from "react";

function App() {
    const [newTodo, setNewTodo] = useState("");

    return (
        <div>
            <h1>ToDo List</h1>
            <AddTodoForm onAddTodo={setNewTodo} />
            <p>{newTodo}</p>
            <TodoList />
        </div>
    );
}

export default App;
