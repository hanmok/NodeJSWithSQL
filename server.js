require('dotenv').config()
const express = require('express')

const jwt = require('jsonwebtoken');

const app = express()

// Middleware
app.use(express.json()) // parse json bodies in the request object

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/todos", require("./routes/todoRoutes"))
app.use("/posts", require("./routes/postRoutes"))
app.use("/users", require("./routes/userRoutes"))



// auth test starts
const posts = [
	{
		username: 'Kyle', 
		title: 'Post 1'
	},
	{
		username: 'Jim', 
		title: 'Post 2'
	}
]
app.get('/posts2', authenticateToken, (req, res) => {
	res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	// Bearer TOKEN
	if (token == null) return res.sendStatus(401);
	
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403) // invalid token
		req.user = user
		next()
	})
}

let refreshTokens = []

app.post('/token', (req, res) => {
	const refreshToken = req.body.token
	if (refreshToken == null) return res.statusCode(401)
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403)
		const accessToken = generateAccessToken({name: user.name })
		res.json({accessToken: accessToken})
	})
})

app.delete('/logout', (req, res) => {
	refreshTokens = refreshTokens.filter(token => token !== req.body.token)
	res.sendStatus(204) // successfully deleted token
})

app.post('/login', (req, res) => {
	// Authenticate User
	const username = req.body.username
	const user = {name: username}
	const accessToken = generateAccessToken(user)
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
	refreshTokens.push(refreshToken)
	res.json({accessToken: accessToken, refreshToken: refreshToken})
})

function generateAccessToken(user){
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '59s'})
}
// auth test ends



// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
	console.log(err.stack)
	console.log(err.name)
	console.log(err.code)

	res.status(500).json({
		message: "Something went really wrong",
	})
})



// Listen on pc port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))