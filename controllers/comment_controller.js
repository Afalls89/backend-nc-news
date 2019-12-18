const { fetchCommentsByArticle_Id } = require("../models/comment_model");
const { checkArticleExists } = require("../models/article_model");

exports.sendCommentsByArticle_Id = (req, res, next) => {
	console.log("you are in the sendCommentsByArticle_Id controller function");
	Promise.all([
		fetchCommentsByArticle_Id(req.params),
		checkArticleExists(req.params)
	])
		.then(([comments]) => {
			console.log(comments);
			res.status(200).send({ comments });
		})
		.catch(next);
};
