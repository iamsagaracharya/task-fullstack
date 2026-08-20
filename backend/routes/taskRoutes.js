// const express = require("express");

// const {
//     getTasks,
//     getTaskById,
//     createTask,
//     updateTask,
//     deleteTask
// } = require("../controllers/taskController");


// const router = express.Router();


// // GET all tasks
// router.get("/", getTasks);


// // GET one task
// router.get("/:id", getTaskById);


// // CREATE task
// router.post("/", createTask);


// // UPDATE task
// router.put("/:id", updateTask);


// // DELETE task
// router.delete("/:id", deleteTask);


// module.exports = router;



const express = require("express");

const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const authMiddleware =
    require("../middleware/authMiddleware");


const router = express.Router();


// Protected routes

router.get(
    "/",
    authMiddleware,
    getTasks
);


router.get(
    "/:id",
    authMiddleware,
    getTaskById
);


router.post(
    "/",
    authMiddleware,
    createTask
);


router.put(
    "/:id",
    authMiddleware,
    updateTask
);


router.delete(
    "/:id",
    authMiddleware,
    deleteTask
);


module.exports = router;