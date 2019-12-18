const knex = require("../db/connection");

exports.fetchArticles = ({
	sort_by = "created_at",
	order = "desc",
	author,
	topic
}) => {
	console.log("you are in the fetchArticles model function");
	const validOrder = ["asc", "desc"];
	if (!validOrder.includes(order)) {
		return Promise.reject({
			status: 400,
			msg: "Please specify either asc or desc as the order value"
		});
	}
	return knex
		.select(
			"articles.author",
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
			if (author) query.where({ "articles.author": author });
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
			return articles;
		});
};

exports.fetchArticleByArticle_Id = ({ article_id }) => {
	console.log("you are in the fetchArticleByArticle_Id model function");
	return knex
		.select("articles.*")
		.from("articles")
		.count({ comment_count: "comment_id" })
		.leftJoin("comments", "articles.article_id", "comments.article_id")
		.groupBy("articles.article_id")
		.where({ "articles.article_id": article_id })
		.then(article => {
			if (article.length === 0) {
				return Promise.reject({
					status: 404,
					msg: `Resource not found for article_id: ${article_id}`
				});
			}
			return article[0];
		});
};

exports.updateArticleByID = ({ article_id }, { inc_vote }) => {
	console.log("you are in the updateArticleByID  model function");
	return knex
		.from("articles")
		.where("article_id", "=", article_id)
		.increment("votes", inc_vote)
		.returning("*")
		.then(article => {
			return article[0];
		});
};
