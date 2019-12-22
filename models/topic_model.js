const knex = require("../db/connection");

exports.fetchAllTopics = () => {
	return knex.select("*").from("topics");
};

exports.checkTopicExists = ({ topic }) => {
	return knex
		.from("topics")
		.select("*")
		.modify(query => {
			if (topic) query.where("slug", topic);
		})
		.then(([topics]) => {
			if (!topics)
				return Promise.reject({
					status: 404,
					msg: `Resource not found for slug: ${topic}`
				});
		});
};
