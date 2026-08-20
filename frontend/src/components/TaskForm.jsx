import { useState, useEffect } from "react";

function TaskForm({
    onSubmit,
    editingTask
}) {

    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [dueDate, setDueDate] =
        useState("");


    useEffect(() => {

        if (editingTask) {

            setTitle(editingTask.title);

            setDescription(
                editingTask.description || ""
            );

            setDueDate(
                editingTask.dueDate?.split("T")[0]
            );

        }

    }, [editingTask]);


    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({
            title,
            description,
            dueDate
        });


        if (!editingTask) {

            setTitle("");
            setDescription("");
            setDueDate("");

        }

    };


    return (

        <form
            className="task-form"
            onSubmit={handleSubmit}
        >

            <h2>

                {editingTask
                    ? "Edit Task"
                    : "Create Task"}

            </h2>


            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                required
            />


            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) =>
                    setDescription(
                        e.target.value
                    )
                }
            />


            <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                    setDueDate(e.target.value)
                }
                required
            />


            <button type="submit">

                {editingTask
                    ? "Update Task"
                    : "Create Task"}

            </button>

        </form>

    );

}

export default TaskForm;