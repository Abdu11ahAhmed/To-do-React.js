"use client";
import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";

export default function TodoApp() {
    let [searchInput, setSearchInput] = useState("");
    let [inputValue, setInputValue] = useState("");
    let [tasks, setTasks] = useState([]);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    let inputText = (e) => {
        setInputValue(e.target.value);
    };

    let addTask = () => {
        if (inputValue.trim() !== "") {
            let newTask = { id: Math.random(), text: inputValue };
            setTasks([...tasks, newTask]);
            setInputValue("");
        }
    };

    let deleteTask = (taskId) => {
        let updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const filteredTasks = tasks.filter((item) =>
        item.text.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h2>Todo App</h2>
            <h5>Search From Tasks:</h5>
            <input
                type="text"
                className="search game"
                value={searchInput}
                onChange={(e) => {
                    setSearchInput(e.target.value);
                }}
                placeholder="Search for a task"
            />
            <h5>Tasks List:</h5>
            <input
                type="text"
                className="game"
                value={inputValue}
                onChange={inputText}
                placeholder="Enter next task"
            />
            <button className="game" onClick={addTask} id="addTask">
                ➕
            </button>

            <ul>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <li key={task.id}>
                            <p className="game"> {task.text}</p>
                            <button
                                className="game"
                                onClick={() => deleteTask(task.id)}
                                id="delTask"
                            >
                                ❌
                            </button>
                        </li>
                    ))
                ) : tasks.length === 0 ? (
                    <li>
                        <p className="full game">No tasks yet</p>
                    </li>
                ) : (
                    <li>
                        <p className="full game">No matching results</p>
                    </li>
                )}
            </ul>
        </div>
    );
}
