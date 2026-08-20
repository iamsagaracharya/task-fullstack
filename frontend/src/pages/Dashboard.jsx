import {
    useEffect,
    useState
} from "react";

import { useNavigate }
from "react-router-dom";

import api from "../services/api";

import { useAuth }
from "../context/AuthContext";

import TaskForm
from "../components/TaskForm";

import TaskCard
from "../components/TaskCard";


function Dashboard() {

    const navigate = useNavigate();

    const { user, logout } =
        useAuth();


    const [tasks, setTasks] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [editingTask,
        setEditingTask] =
        useState(null);


    // =====================
    // GET TASKS
    // =====================

    const fetchTasks =
        async () => {

            try {

                const response =
                    await api.get(
                        "/tasks"
                    );

                setTasks(
                    response.data.data
                );

            } catch (error) {

                console.error(
                    error
                );

            } finally {

                setLoading(false);

            }

        };


    useEffect(() => {

        fetchTasks();

    }, []);


    // =====================
    // CREATE TASK
    // =====================

    const createTask =
        async (taskData) => {

            try {

                const response =
                    await api.post(
                        "/tasks",
                        taskData
                    );

                setTasks([
                    response.data.data,
                    ...tasks
                ]);

            } catch (error) {

                console.error(
                    error
                );

            }

        };


    // =====================
    // UPDATE TASK
    // =====================

    const updateTask =
        async (taskData) => {

            try {

                const response =
                    await api.put(
                        `/tasks/${editingTask._id}`,
                        taskData
                    );

                setTasks(
                    tasks.map(
                        (task) =>
                            task._id ===
                            editingTask._id
                                ? response.data.data
                                : task
                    )
                );

                setEditingTask(
                    null
                );

            } catch (error) {

                console.error(
                    error
                );

            }

        };


    // =====================
    // DELETE TASK
    // =====================

    const deleteTask =
        async (id) => {

            const confirmed =
                window.confirm(
                    "Delete task?"
                );

            if (!confirmed) return;


            try {

                await api.delete(
                    `/tasks/${id}`
                );

                setTasks(
                    tasks.filter(
                        (task) =>
                            task._id !== id
                    )
                );

            } catch (error) {

                console.error(
                    error
                );

            }

        };


    const handleLogout =
        () => {

            logout();

            navigate("/login");

        };


    return (

        <div
            className="dashboard"
        >

            <div
                className="dashboard-header"
            >

                <h1>

                    Welcome,
                    {" "}
                    {user?.name}

                </h1>

                <button
                    onClick={
                        handleLogout
                    }
                >
                    Logout
                </button>

            </div>


            <TaskForm

                editingTask={
                    editingTask
                }

                onSubmit={
                    editingTask
                        ? updateTask
                        : createTask
                }

            />


            <h2>
                Tasks
            </h2>


            {loading ? (

                <p>
                    Loading...
                </p>

            ) : (

                <div
                    className="task-grid"
                >

                    {tasks.map(
                        (task) => (

                            <TaskCard

                                key={
                                    task._id
                                }

                                task={task}

                                onEdit={
                                    setEditingTask
                                }

                                onDelete={
                                    deleteTask
                                }

                            />

                        )
                    )}

                </div>

            )}

        </div>

    );

}

export default Dashboard;