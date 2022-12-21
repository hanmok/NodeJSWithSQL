const express = require('express');
const todoController = require('../controllers/todoController');
const router = express.Router();

router
	.route("/")
	.get(todoController.getAllTodos) // ok
	.post(todoController.createNewTodo); // ok

router
	.route("/:id")
	.get(todoController.getTodoById) //ok 
	.delete(todoController.deleteTodoById) // ok
	.put(todoController.checkTodo)
	


module.exports = router;


