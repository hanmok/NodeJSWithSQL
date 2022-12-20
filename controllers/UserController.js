const User = require('../models/User');

exports.getUser = async (req, res, next) => { 
	try {
		let {username, password} = req.body;
		const [user, _] = await User.login(username, password);
		res.status(200).json({user: user[0]})
	} catch (error) { 
		console.log(error);
		next(error);
	}
}