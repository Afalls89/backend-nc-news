const knex = require("../db/connection");

exports.fetchUserByUsername = username => {
	console.log("you are in the fetchUserByUsername model function");
	return knex
		.select("*")
		.from("users")
		.where("username", username)
		.then(user => {
			if (user.length === 0) {
				return Promise.reject({
					status: 404,
					msg: `No user found for username: ${username}`
				});
			}
			return { user: user[0] };
		});
};
