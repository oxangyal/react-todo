import { BrowserRouter, Route, Routes } from "react-router-dom";

import Clock from "../components/Clock/Clock";
import TodoContainer from "../components/TodoContainer/TodoContainer";
import Weather from "../components/Weather/Weather";
import style from "./App.module.css";

function App() {
    return (
        <>
            <div className={style.Container}>
                <div className={style.WeatherContainer}>
                    <Clock />
                    <Weather />
                </div>
                <div className={style.TodoContainer}>
                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<TodoContainer />} />
                            <Route
                                path="/new"
                                element={<h1>New Todo List</h1>}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
}

export default App;
