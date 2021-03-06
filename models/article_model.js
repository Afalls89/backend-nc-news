const knex = require("../db/connection");

exports.fetchArticles = ({
	sort_by = "created_at",
	order = "desc",
	author,
	topic
}) => {
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
		.orderBy(sort_by, order);
};

exports.fetchArticleByArticleId = ({ article_id }) => {
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

exports.updateArticleByID = ({ article_id }, { inc_vote = 0 }) => {
	return knex
		.from("articles")
		.where("article_id", "=", article_id)
		.increment("votes", inc_vote)
		.returning("*")
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

exports.checkArticleExists = ({ article_id }) => {
	return knex
		.from("articles")
		.select("*")
		.where({ article_id })
		.then(([article]) => {
			if (!article)
				return Promise.reject({
					status: 404,
					msg: `Resource not found for article_id: ${article_id}`
				});
		});
};
