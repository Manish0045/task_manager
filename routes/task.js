const express = require('express');
const {
    getTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask
} = require('../controllers/task')


const router = express.Router();

router
    .get('/tasks', getTasks)
    .get('/tasks/:id', getTask)
    .post('/tasks', addTask)
    .put('/tasks/:id', updateTask)
    .delete('/tasks/:id', deleteTask)

module.exports = router;