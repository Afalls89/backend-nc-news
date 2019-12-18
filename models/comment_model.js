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

exports.insertCommentByArticle_Id = (dataToInsert, { article_id }) => {
	console.log("you are in the insertCommentByArticle_Id  model function");
	const formattedData = { ...dataToInsert };
	formattedData.author = dataToInsert.username;
	formattedData.article_id = article_id;
	delete formattedData.username;

	console.log(formattedData);
	return (
		knex
			.insert(formattedData)
			.into("comments")
			// .where({ article_id })
			.returning("*")
			.then(comment => {
				if (comment.length === 0) {
					return Promise.reject({
						status: 404,
						msg: "No articles found for that query"
					});
				}
				return { comment: comment[0] };
			})
	);
};
