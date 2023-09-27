import "./TodoContainer.module.css";

import { useEffect, useState } from "react";

import AddTodoForm from "../AddTodoForm/AddTodoForm";
import PropTypes from "prop-types";
import TodoList from "../TodoList/TodoList";
import iconA from "../../assets/sort48u.png";
import iconZ from "../../assets/sort48d.png";
import sortDown from "../../assets/sort48down.png";
import sortUp from "../../assets/sort48up.png";
import style from "./TodoContainer.module.css";

const TodoContainer = ({ tableName, baseName, apiKey }) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("ascending");
    const [sortedTodoList, setSortedTodoList] = useState([]);
    const [dateSortOrder, setDateSortOrder] = useState("ascending");
    const [editTodoId, setEditTodoId] = useState(null);
    const [editedText, setEditedText] = useState("");

    const handleEdit = (id, editedText) => {
        const editedTodo = todoList.find((todo) => todo.id === id);
        if (editedTodo) {
            setEditedText(editedTodo.title);
        }
        setEditTodoId(id);
    };

    const handleSaveClick = (editedText, id) => {
        const updatedTodoList = todoList.map((todo) =>
            todo.id === id ? { ...todo, title: editedText } : todo
        );
        setTodoList(updatedTodoList);
        setEditTodoId(null);
    };

    const handleCancelClick = () => {
        setEditTodoId(null);
    };

    const handleSort = () => {
        const newSortOrder =
            sortOrder === "ascending" ? "descending" : "ascending";
        const sortedData = [...todoList].sort((a, b) => {
            if (newSortOrder === "ascending") {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });

        setSortedTodoList(sortedData);
        setSortOrder(newSortOrder);
    };

    const handleSortDate = () => {
        const newDateSortOrder =
            dateSortOrder === "ascending" ? "descending" : "ascending";
        const sortedData = [...todoList].sort((a, b) => {
            if (newDateSortOrder === "ascending") {
                return new Date(a.createdTime) - new Date(b.createdTime);
            } else {
                return new Date(b.createdTime) - new Date(a.createdTime);
            }
        });
        setSortedTodoList(sortedData);
        setDateSortOrder(newDateSortOrder);
    };

    //Fetch  API, get data from Airtable
    const fetchData = async () => {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        };

        try {
            const url = `https://api.airtable.com/v0/${baseName}/${tableName}`;
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            const data = await response.json();

            // // Sorting ascending order

            // function sortData(a, b) {
            //     if (a.title > b.title) {
            //         return 1;
            //     }
            //     if (a.title < b.title) {
            //         return -1;
            //     }
            //     return 0;
            // }

            const todos = data.records.map((todo) => {
                const d = new Date(todo.createdTime);
                const date = d.toLocaleDateString("en-EN", {
                    month: "short",
                    day: "numeric",
                });
                return {
                    id: todo.id,
                    createdTime: `${date}`,
                    title: todo.fields.title,
                };
            });
            setTodoList(todos);
            setSortedTodoList(
                [...todos].sort((a, b) => {
                    if (sortOrder === "ascending") {
                        return a.title.localeCompare(b.title);
                    } else {
                        return b.title.localeCompare(a.title);
                    }
                })
            );
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
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                fields: {
                    title: title.title,
                },
            }),
        };
        try {
            const url = `https://api.airtable.com/v0/${baseName}/${tableName}`;
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const todo = await response.json();
            const d = new Date(todo.createdTime);
            const date = d.toLocaleDateString("en-EN", {
                month: "short",
                day: "numeric",
            });
            const newTodo = {
                id: todo.id,
                title: todo.fields.title,
                createdTime: `${date}`,
            };
            setTodoList([...todoList, newTodo]);
            setSortedTodoList([...sortedTodoList, newTodo]);
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
            const url = `https://api.airtable.com/v0/${baseName}/${tableName}/${id}`;

            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            });

            if (response.ok) {
                const filteredList = todoList.filter((data) => data.id !== id);
                setTodoList(filteredList);
                const sortedFilteredList = sortedTodoList.filter(
                    (data) => data.id !== id
                );
                setSortedTodoList(sortedFilteredList);
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

    // function handleSortToggle() {
    //     if (sortOrder === "ascending") {
    //         setSortOrder("descending");
    //     } else {
    //         setSortOrder("ascending");
    //     }
    // }
    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <div className={style.SortButtons}>
                <button
                    type="button"
                    className={style.Sort}
                    onClick={handleSort}
                >
                    {sortOrder === "ascending" ? (
                        <img
                            className={style.sortingIcon}
                            src={iconA}
                            alt="Sorting A-Z Icon"
                        />
                    ) : (
                        <img
                            className={style.sortingIcon}
                            src={iconZ}
                            alt="Sorting Z-A Icon"
                        />
                    )}{" "}
                    {/* <img src= {iconSort} alt="Sort Icon" /> */}
                </button>
                <button
                    type="button"
                    className={style.Sort}
                    onClick={handleSortDate}
                >
                    {dateSortOrder === "ascending" ? (
                        <img
                            className={style.sortingIcon}
                            src={sortUp}
                            alt="Sorting Newest Date Icon"
                        />
                    ) : (
                        <img
                            className={style.sortingIcon}
                            src={sortDown}
                            alt="Sorting Oldest Date Icon"
                        />
                    )}
                </button>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <TodoList
                    todoList={sortedTodoList}
                    onRemoveTodo={removeTodo}
                    onEditTodo={handleEdit}
                    editTodoId={editTodoId}
                    onSave={handleSaveClick}
                    onCancel={handleCancelClick}
                    editedText={editedText}
                    setEditedText={setEditedText}
                />
            )}
        </>
    );
};

TodoContainer.propTypes = {
    tableName: PropTypes.string,
    baseName: PropTypes.string,
    apiKey: PropTypes.string,
};

export default TodoContainer;
