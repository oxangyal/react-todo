import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Clock from "../components/Clock/Clock";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";
import NotFound from "../components/NotFound/NotFound";
import Quote from "../components/Quote/Quote";
import Timer from "../components/Timer/Timer";
import TodoContainer from "../components/TodoContainer/TodoContainer";
import Weather from "../components/Weather/Weather";
import style from "./App.module.css";

// import HomePage from "../components/Home/Home";
// import NavBar from "../components/NavBar/NavBar";
// import TodoList from "../components/TodoList/TodoList";

const tableId = process.env.REACT_APP_TABLE_ID;
const tableStudy = process.env.REACT_APP_TABLE_STUDY;
const baseName = process.env.REACT_APP_AIRTABLE_BASE_ID;
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const listStudyTitle = "Study";
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
                <div className={style.Navigation}>
                    <div className={style.TodoContainer}>
                        <BrowserRouter>
                            {/* <NavBar /> */}
                            <div>
                                <ul className={style.NavLinkWrapper}>
                                    <li className={style.NavLink}>
                                        <Link to="/">Home</Link>
                                    </li>

                                    <li className={style.NavLink}>
                                        <Link to="/study">Study</Link>
                                    </li>
                                </ul>
                            </div>

                            <Routes>
                                <Route
                                    exact
                                    path="/"
                                    element={
                                        <TodoContainer
                                            tableId={tableId}
                                            // tableId={tableStudy}
                                            baseName={baseName}
                                            apiKey={apiKey}
                                        />
                                    }
                                />

                                <Route
                                    exact
                                    path="/study"
                                    element={
                                        <TodoContainer
                                            // tableId={tableId}
                                            tableId={tableStudy}
                                            baseName={baseName}
                                            apiKey={apiKey}
                                            listName={listStudyTitle}
                                        />
                                    }
                                />
                                <Route
                                    path="/new"
                                    element={<h1>New Todo List</h1>}
                                />

                                {/* <Route path="/" element={<HomePage />} /> */}
                                <Route path="/home" element={<Home />} />
                                {/* <Route path="/training" element={<Training/>} /> */}
                                <Route path="/404" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;
