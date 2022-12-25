require('dotenv').config();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

class User {
	constructor(username, password) {
		this.username = this.username
		this.password = this.password
	}

	static login(username, password) { 
		const sql = `SELECT * FROM user WHERE username='${username}' AND password='${password}'`
		console.log(`${username} has logged in`);
		return db.execute(sql);
	}
}

module.exports = User;