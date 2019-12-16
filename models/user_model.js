const knex = require("../db/connection");

exports.fetchUserByUsername = username => {
	console.log("you are in the fetchUserByUsername model function");
	return knex
		.select("*")
		.from("users")
		.where("username", username)
		.then(user => {
			return { user: user[0] };
		});
};
