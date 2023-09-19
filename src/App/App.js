import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import Clock from "../components/Clock/Clock";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import TodoContainer from "../components/TodoContainer/TodoContainer";
import Weather from "../components/Weather/Weather";
import style from "./App.module.css";

const tableName = process.env.REACT_APP_TABLE_NAME;
const baseName = process.env.REACT_APP_AIRTABLE_BASE_ID;
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;

function App() {
    return (
        <>
            <div className={style.Container}>
                <div className={style.WeatherContainer}>
                    <NavBar />
                    <Clock />
                    <Weather />
                </div>
                <div className={style.TodoContainer}>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={
                                    <TodoContainer
                                        tableName={tableName}
                                        baseName={baseName}
                                        apiKey={apiKey}
                                    />
                                }
                            />
                            <Route
                                path="/new"
                                element={<h1>New Todo List</h1>}
                            />
                        </Routes>
                    </BrowserRouter>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;
