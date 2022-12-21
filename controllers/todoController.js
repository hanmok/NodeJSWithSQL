const Todo = require('../models/Todo');


// CREATE
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


// Fetch All
exports.getAllTodos = async (req, res, next) => { 
	try {
		let userId = req.query.userId;
		const [todos, _] = await Todo.findAll(userId);
		res.status(200).json({count: todos.length, todos})
	} catch (error) {
		console.log(error);
		next(error);
	}
}

// Fetch One
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

// Delete One
exports.deleteTodoById = async (req, res, next) => { 
	try {
		let todoId = req.params.id;
		let _ = await Todo.delete(todoId);
		res.status(200).json({message: "successfully deleted"});
	} catch (error) { 
		console.log(error);
		next(error);
	}
}

// Update done status
exports.checkTodo = async (req, res, next) => { 
	try { 
		let todoId = req.params.id;
		let [todos, _] = await Todo.findById(todoId); // todos: plural
		let isDone = todos[0].isDone
		if (isDone === 0) { 
			let _ = await Todo.check(todoId);
			res.status(200).json({todo: todos[0], isChecked: true});
		} else {
			let _ = await Todo.uncheck(todoId);
			res.status(200).json({todo: todos[0], isChecked: false});
		}
	} catch (error) { 
		console.log(error);
		next(error);
	}
}