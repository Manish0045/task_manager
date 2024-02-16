const { v4 } = require("uuid");

let tasks = [
    {
        id: 1,
        title: "New item purchase",
        description: "New item purchase from market",
    },
];

const getTasks = (req, res) => {
    const allTasks = tasks;
    res.send({
        status: 200,
        message: "Fetched all tasks successfully",
        data: allTasks,
    });
};

const getTask = (req, res) => {
    const taskId = Number(req.params.id);

    if (isNaN(taskId) || taskId <= 0) {
        return res.status(400).json({
            status: 400,
            message: "Invalid task id",
        });
    }

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return res.status(404).json({
            status: 404,
            message: "No task found with that id",
        });
    }

    res.send({
        status: 200,
        message: "Fetched task successfully",
        data: task,
    });
};

const addTask = (req, res) => {
    const newTask = req.body;

    if (!newTask.title || !newTask.description) {
        return res.status(400).json({
            status: 400,
            message: "Missing fields in request body",
        });
    }

    newTask.id = v4();
    tasks.push(newTask);
    res.status(201).json({
        status: 201,
        message: "Created a new task",
        data: newTask,
    });
};

const updateTask = (req, res) => {
    const taskId = Number(req.params.id);
    const { title, description } = req.body;

    if (isNaN(taskId) || taskId <= 0) {
        return res.status(400).json({
            status: 400,
            message: "Invalid task id",
        });
    }

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return res.status(404).json({
            status: 404,
            message: "No task found with that id",
        });
    }

    if (title) task.title = title;
    if (description) task.description = description;

    res.status(200).json({
        status: 200,
        message: `Task with id ${taskId} has been updated successfully`,
    });
};

const deleteTask = (req, res) => {
    const taskId = Number(req.params.id);

    if (isNaN(taskId) || taskId <= 0) {
        return res.status(400).json({
            status: 400,
            message: "Invalid task id",
        });
    }

    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({
            status: 404,
            message: "No task found with that id",
        });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({
        status: 200,
        message: `Task with id ${taskId} has been deleted successfully`,
    });
};

module.exports = {
    getTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
};
