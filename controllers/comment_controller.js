const {
	fetchCommentsByArticle_Id,
	insertCommentByArticle_Id,
	updateCommentByComment_Id,
	deleteCommentByComment_Id
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

exports.modifyCommentByComment_Id = (req, res, next) => {
	console.log("you are in the modifyCommentByComment_Id controller function");
	updateCommentByComment_Id(req.body, req.params)
		.then(comment => {
			res.status(200).send({ comment });
		})
		.catch(next);
};

exports.removeCommentByComment_Id = (req, res, next) => {
	console.log("you are in the removeCommentByComment_Id controller function");
	deleteCommentByComment_Id(req.params)
		.then(() => {
			res.sendStatus(204);
		})
		.catch(next);
};
