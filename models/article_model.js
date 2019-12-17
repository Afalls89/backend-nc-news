const knex = require("../db/connection");

exports.fetchAllArticles = ({ sort_by = "created_at", order = "desc" }) => {
	console.log("you are in the fetchALLArticles model function");
	return knex
		.select("author", "title", "article_id", "topic", "created_at", "votes")
		.from("articles")
		.orderBy(sort_by, order)
		.then(articles => {
			return { articles };
		});
};
