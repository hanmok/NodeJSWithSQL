const Todo = require('../models/Todo');

exports.getAllTodos = async (req, res, next) => { 
	try { 
		let userId = req.params.id
		const [todos, _] = await Todo.findAll(userId);
		res.status(200).json({count: todos.length, todos})
	} catch (error) {
		console.log(error);
		console.log("errrrrr");
		next(error);
	}
}

exports.createNewTodo = async (req, res, next) => { 
	try {
		let {title, userId, specification, priority, targetDate} = req.body;
		let todo = new Todo(title, userId, specification, priority, targetDate);
		await todo.save();
		res.status(201).json({todo: todo})
	} catch (error) {
		console.log(error);
		next(error);
	}
}

exports.getTodoById = async (req, res, next) => { 
	try {
		let todoId = req.params.id;
		let [todo, _] = await Todo.findById(todoId);
		res.status(200).json({todo: todo[0]});
	} catch (error) {
		console.log(error);
		next(error);
	}
}

exports.deleteTodoById = async (req, res, next) => { 
	try {
		let todoId = req.params.id;
		await Todo.delete(todoId);
		res.status(200)
	} catch (error) { 
		console.log(error);
		next(error);
	}
}

exports.checkTodo = async (req, res, next) => { 
	try { 
		let todoId = req.params.id;
		let [todo, _] = await Todo.findById(todoId);
		let isDone = todo.isDone
		let ret = isDone ? await Todo.uncheck(todoId) : await Todo.check(todoId);
		res.status(200)
	} catch (error) { 
		console.log(error);
		next(error);
	}
}