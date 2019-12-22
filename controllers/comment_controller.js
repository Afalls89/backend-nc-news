const {
	fetchCommentsByArticleId,
	insertCommentByArticleId,
	updateCommentByCommentId,
	deleteCommentByCommentId
} = require("../models/comment_model");
const { checkArticleExists } = require("../models/article_model");

exports.sendCommentsByArticleId = (req, res, next) => {
	Promise.all([
		fetchCommentsByArticleId(req.params, req.query),
		checkArticleExists(req.params)
	])
		.then(([comments]) => {
			res.status(200).send({ comments });
		})
		.catch(next);
};

exports.uploadCommentByArticleId = (req, res, next) => {
	insertCommentByArticleId(req.body, req.params)
		.then(comment => {
			res.status(201).send({ comment });
		})
		.catch(next);
};

exports.modifyCommentByCommentId = (req, res, next) => {
	updateCommentByCommentId(req.body, req.params)
		.then(comment => {
			res.status(200).send({ comment });
		})
		.catch(next);
};

exports.removeCommentByCommentId = (req, res, next) => {
	deleteCommentByCommentId(req.params)
		.then(() => {
			res.sendStatus(204);
		})
		.catch(next);
};
