const knex = require("../db/connection");

exports.fetchArticles = ({
	sort_by = "created_at",
	order = "desc",
	author,
	topic
}) => {
	console.log("you are in the fetchArticles model function");
	console.log(topic);
	return knex
		.select("author", "title", "article_id", "topic", "created_at", "votes")
		.from("articles")
		.modify(query => {
			if (author) query.where({ author });
			if (topic) query.where({ topic });
		})
		.orderBy(sort_by, order)
		.then(articles => {
			return { articles };
		});
};
