const { fetchUserByUsername } = require("../models/user_model");

exports.sendUserByUsername = (req, res, next) => {
	console.log("you are in the sendUserByUsername controller function");
	const { username } = req.params;
	fetchUserByUsername(username)
		.then(user => {
			res.status(200).send(user);
		})
		.catch(next);
};
