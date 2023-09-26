import { BrowserRouter, Route, Routes } from "react-router-dom";

import Clock from "../components/Clock/Clock";
import Footer from "../components/Footer/Footer";
import Quote from "../components/Quote/Quote";
import Timer from "../components/Timer/Timer";
import TodoContainer from "../components/TodoContainer/TodoContainer";
import Weather from "../components/Weather/Weather";
import style from "./App.module.css";

// import NavBar from "../components/NavBar/NavBar";

const tableName = process.env.REACT_APP_TABLE_NAME;
const baseName = process.env.REACT_APP_AIRTABLE_BASE_ID;
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;

function App() {
    return (
        <>
            <div className={style.Container}>
                <div className={style.WeatherContainer}>
                    <Clock />
                    <Weather />
                    <Quote />
                    <Timer />
                </div>
                {/* <div>
                    <NavBar />
                    
                </div> */}
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
                        </Routes>
                    </BrowserRouter>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;
