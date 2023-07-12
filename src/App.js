import { BrowserRouter, Route, Routes } from "react-router-dom";

import Clock from "./Clock";
import TodoContainer from "./TodoContainer";
import Weather from "./Weather";

function App() {
    return (
        <>
            <Clock />
            <Weather />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<TodoContainer />} />
                    <Route path="/new" element={<h1>New Todo List</h1>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
