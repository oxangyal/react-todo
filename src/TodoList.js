import React from 'react';

const todoList = [
    {
    id: 1,
    title: "Open water swim 1500 yards"
    },
    {
    id: 2,
    title: "Bike ride - 15 miles"
    },
    {
    id: 3,
    title: "Run 40 minutes"
    }
];

function TodoList() {
    return (
        <ul>
        {todoList.map(item => (
            <li key={item.id}>
                {item.title}
            </li>
            )
            )}
        </ul>
    );
}

export default TodoList;