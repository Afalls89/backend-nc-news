const knex = require("../db/connection");

exports.fetchUserByUsername = ({ username }) => {
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
			return user[0];
		});
};

exports.checkAuthorExists = ({ author }) => {
	console.log(author);
	return knex
		.from("users")
		.select("*")
		.modify(query => {
			if (author) query.where("username", author);
		})
		.then(([authors]) => {
			if (!authors)
				return Promise.reject({
					status: 404,
					msg: `Resource not found for author: ${author}`
				});
		});
};
