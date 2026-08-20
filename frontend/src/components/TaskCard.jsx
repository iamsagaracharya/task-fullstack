function TaskCard({
    task,
    onEdit,
    onDelete
}) {

    return (

        <div className="task-card">

            <h3>
                {task.title}
            </h3>

            <p>
                {task.description}
            </p>

            <p>

                <strong>
                    Due:
                </strong>

                {" "}

                {new Date(
                    task.dueDate
                ).toLocaleDateString()}

            </p>


            <div
                className="task-actions"
            >

                <button
                    onClick={() =>
                        onEdit(task)
                    }
                >
                    Edit
                </button>

                <button
                    onClick={() =>
                        onDelete(task._id)
                    }
                >
                    Delete
                </button>

            </div>

        </div>

    );

}

export default TaskCard;