const knex = require("../db/connection");

exports.fetchAllTopics = () => {
	console.log("you are in the fetchAllTopics model function");
	return knex.select("*").from("topics");
};
