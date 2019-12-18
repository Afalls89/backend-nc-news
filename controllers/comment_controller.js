const {
	fetchCommentsByArticle_Id,
	insertCommentByArticle_Id
} = require("../models/comment_model");
const { checkArticleExists } = require("../models/article_model");

exports.sendCommentsByArticle_Id = (req, res, next) => {
	console.log("you are in the sendCommentsByArticle_Id controller function");
	Promise.all([
		fetchCommentsByArticle_Id(req.params, req.query),
		checkArticleExists(req.params)
	])
		.then(([comments]) => {
			res.status(200).send({ comments });
		})
		.catch(next);
};

exports.uploadCommentByArticle_Id = (req, res, next) => {
	console.log("you are in the uploadCommentByArticle_Id controller function");
	insertCommentByArticle_Id(req.body, req.params)
		.then(comment => {
			res.status(201).send(comment);
		})
		.catch(next);
};
