const db = require('../config/db');

class Todo {
	constructor(title, userId, targetDate = new Date(), description = '', priority = 0) {
		this.title = title;
		this.userId = userId
		this.targetDate = targetDate;
		this.description = description;
		this.priority = priority;
	}

	save() { 
		const sql = `
		INSERT INTO todo(
			title,
			user_id
			description,
			targetDate,
			priority
		)
		VALUES(
			'${this.title}',
			'${this.userId}',
			'${this.targetDate}',
			'${this.description}',
			'${this.priority}'
		)
		`;
		return db.execute(sql);
	}

	static findAll(userId) {
		const sql = `SELECT * FROM todo WHERE id=${userId}`;
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