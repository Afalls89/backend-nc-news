const knex = require("../db/connection");

exports.fetchArticles = ({
	sort_by = "created_at",
	order = "desc",
	author,
	topic
}) => {
	console.log("you are in the fetchArticles model function");
	return knex
		.select(
			"articles.author AS author",
			"title",
			"articles.article_id",
			"topic",
			"articles.created_at",
			"articles.votes"
		)
		.from("articles")
		.count({ comment_count: "comment_id" })
		.leftJoin("comments", "articles.article_id", "comments.article_id")
		.groupBy("articles.article_id")
		.modify(query => {
			if (author) query.where({ author });
			if (topic) query.where({ topic });
		})
		.orderBy(sort_by, order)
		.then(articles => {
			if (articles.length === 0) {
				return Promise.reject({
					status: 404,
					msg: "No articles found for that query"
				});
			}
			// if (order !== "asc" || order !== "desc") {
			// 	return Promise.reject({
			// 		status: 400,
			// 		msg: "Please specify either asc or desc as the order value"
			// 	});
			// }
			return { articles };
		});
};
