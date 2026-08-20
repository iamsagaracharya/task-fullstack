const Task = require("../models/Task");



// GET ALL TASKS
// GET /api/tasks
const getTasks = async (req, res) => {
    try {

        const tasks = await Task.find({
            user: req.user.id

        });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks",
            error: error.message
        });

    }
};


// GET SINGLE TASK
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch task",
            error: error.message
        });

    }
};


// CREATE TASK
// POST /api/tasks
const createTask = async (req, res) => {
    try {

        const {
            title,
            description,
            dueDate
        } = req.body;


        // Basic validation

        if (!title || !dueDate) {
            return res.status(400).json({
                success: false,
                message: "Title and due date are required"
            });
        }


        const task = await Task.create({
            title,
            description,
            dueDate,

            // Temporary user ID
            // JWT will provide this later
            // user: "68a000000000000000000001"
            user: req.user.id
        });


        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to create task",
            error: error.message
        });

    }
};


// UPDATE TASK
// PUT /api/tasks/:id
const updateTask = async (req, res) => {
    try {

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );


        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to update task",
            error: error.message
        });

    }
};


// DELETE TASK
// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    try {

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });


        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete task",
            error: error.message
        });

    }
};


module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};