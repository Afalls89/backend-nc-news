const knex = require("../db/connection");

exports.fetchCommentsByArticleId = (
	{ article_id },
	{ sort_by = "created_at", order = "desc" }
) => {
	return knex
		.from("comments")
		.select("comment_id", "votes", "created_at", "author", "body")
		.where({ article_id })
		.orderBy(sort_by, order);
};

exports.insertCommentByArticleId = (dataToInsert, { article_id }) => {
	const formattedData = {
		...dataToInsert,
		author: dataToInsert.username,
		article_id: article_id
	};
	delete formattedData.username;

	return knex
		.insert(formattedData)
		.into("comments")
		.returning("*")
		.then(comment => {
			if (comment.length === 0) {
				return Promise.reject({
					status: 404,
					msg: "No articles found for that query"
				});
			}
			return comment[0];
		});
};

exports.updateCommentByCommentId = ({ inc_vote = 0 }, { comment_id }) => {
	return knex
		.from("comments")
		.where("comment_id", "=", comment_id)
		.increment("votes", inc_vote)
		.returning("*")
		.then(comment => {
			if (comment.length === 0) {
				return Promise.reject({
					status: 404,
					msg: `Resource not found for comment_id: ${comment_id}`
				});
			}
			return comment[0];
		});
};

exports.deleteCommentByCommentId = ({ comment_id }) => {
	return knex
		.from("comments")
		.where({ comment_id })
		.del()
		.then(delCount => {
			if (delCount === 0) {
				return Promise.reject({
					status: 404,
					msg: `comment not deleted, Resource not found for comment_id: ${comment_id}`
				});
			}
		});
};
