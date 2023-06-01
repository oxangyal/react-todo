import React from 'react';

function App() {
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
      title: "Bike ride - 15 miles"
    }
  ];

  return (
    <div>
      <h1>ToDo List</h1>
      <ul>
        {todoList.map(item => (
          <li key={item.id}> {item.title}</li>
        )
        )}; 
      </ul>
  </div>
  );
}

export default App;
