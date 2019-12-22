const { fetchUserByUsername } = require("../models/user_model");

exports.sendUserByUsername = (req, res, next) => {
	const { username } = req.params;
	fetchUserByUsername(req.params)
		.then(user => {
			res.status(200).send({ user });
		})
		.catch(next);
};
