const db = require('../config/db');

class Todo {
	constructor(title, userId, specification, priority, targetDate = new Date()) {
		this.title = title;
		this.userId = userId
		this.targetDate = targetDate;
		this.specification = specification;
		this.priority = priority;
		this.isDone = 0
		this.id
	}
	

	static postSimple(title, userId){
		return new Todo(title, userId, null, null)
	}


	save() { 
		const sql = `
		INSERT INTO todo(
			title,
			user_id
		)
		VALUES(
			'${this.title}',
			${this.userId}
		)
		`;
		return db.execute(sql);
	}

	static findAll(userId) {
		console.log(`findAll called, userId: ${userId}`);
		const sql = `SELECT * FROM todo WHERE user_id=${userId}`;
		return db.execute(sql);
	}

	static findById(todoId) {
		const sql = `SELECT * FROM todo WHERE id=${todoId};`;
		return db.execute(sql);
	}

	static delete(id) {
		const sql = `DELETE FROM todo WHERE id=${id}`;
		return db.execute(sql);
	}

	static check(id) {
		const sql = `UPDATE todo SET isDone=1 WHERE id=${id}`;
		return db.execute(sql);
	}
	
	static uncheck(id) {
		const sql = `UPDATE todo SET isDone=0 WHERE id=${id}`;
		return db.execute(sql);
	}
}

module.exports = Todo;