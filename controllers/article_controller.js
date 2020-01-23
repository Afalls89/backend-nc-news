const {
	fetchArticles,
	fetchArticleByArticleId,
	updateArticleByID
} = require("../models/article_model");

const { checkAuthorExists } = require("../models/user_model");
const { checkTopicExists } = require("../models/topic_model");

exports.sendArticles = (req, res, next) => {
	Promise.all([
		fetchArticles(req.query),
		checkAuthorExists(req.query),
		checkTopicExists(req.query)
	])

		.then(([articles]) => {
			res.status(200).send({ articles });
		})
		.catch(next);
};

exports.sendArticleByArticleId = (req, res, next) => {
	fetchArticleByArticleId(req.params)
		.then(article => {
			res.status(200).send({ article });
		})
		.catch(next);
};

exports.modifyArticleByID = (req, res, next) => {
	const contentToUpdate = req.body;
	updateArticleByID(req.params, contentToUpdate)
		.then(article => {
			res.status(200).send({ article });
		})
		.catch(next);
};
