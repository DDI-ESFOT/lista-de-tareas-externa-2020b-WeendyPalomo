import { useEffect, useState } from "react";
import User from "./User.js";
import "../styles/todoList.css"

const ToDoList = ({event}) => {
    const [userData, setUserData] = useState(null);
    const [userTodo, setUserTodo] = useState([]);
    const [userId, setUserId] = useState(1);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${userId}`
            );
            const data = await response.json();
            setUserData(data);
        };

        getData();

        const getTodo = async () => {
            const answer = await fetch(
                `https://jsonplaceholder.typicode.com/users/${userId}/todos`
            );
            const todo = await answer.json();
            setUserTodo(todo);
        };

        getTodo();
    }, [userId]);

    const previousUser = () => {
        if (userId > 1) {
            setUserId((prevState) => prevState - 1);
        }
    };

    const nextUser = () => {
        if (userId < 10) {
            setUserId((prevState) => prevState + 1);
        }
    };

    const handleCompletedTask = (index) => {
        setUserTodo((prevState) => {
            const auxList = [...prevState];
            auxList[index].completed = true;
            return auxList;
        });
    };

    const handleRemoveTask = (index) => {
        setUserTodo((prevState) => {
            return prevState.filter((task, i) => i !== index);
        });
    };

    const handleAddTask = () => {
        const task = document.querySelector("#taskInput").value;
        const newTask = {
            userId: userId,
            id: userTodo[userTodo.length - 1].id + 1,
            title: task,
            completed: false,
        };

        setUserTodo((prevState) => {
            return [...prevState, newTask];
        });

        document.querySelector("#taskInput").value = "";
    };

    return (
        <>
            <button onClick={previousUser} disabled={userId <= 1}>
                Anterior usuario
            </button>
            <button onClick={nextUser} disabled={userId >= 10}>
                Siguiente usuario
            </button>
            {userData ? <User userData={userData} /> : null}
            <div>
                Tarea{" "}
                <input type="text" placeholder="Ingrese tarea" id="taskInput" />
                <button onClick={handleAddTask}>Agregar tarea</button>
            </div>
            <h1>Lista de tareas ({userTodo.length} en total)</h1>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Eliminar</th>
                </tr>
                </thead>
                <tbody>
                {userTodo.map((task, index) => {
                    return (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>
                                {task.completed ? (
                                        <label className="completedTask">
                                            Completada
                                        </label>
                                ) : (
                                    <button
                                        className="markAsCompleted"
                                        onClick={() => handleCompletedTask(index)}
                                    >
                                        Marcar como completada
                                    </button>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleRemoveTask(index)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    );
}
export default ToDoList;