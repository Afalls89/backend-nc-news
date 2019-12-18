const knex = require("../db/connection");

exports.fetchCommentsByArticle_Id = (
	{ article_id },
	{ sort_by = "created_at", order = "desc" }
) => {
	console.log("you are in the fetchCommentsByArticle_Id  model function");
	return knex
		.from("comments")
		.select("comment_id", "votes", "created_at", "author", "body")
		.where({ article_id })
		.orderBy(sort_by, order);
};
