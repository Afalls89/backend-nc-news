const {
	fetchArticles,
	fetchArticleByArticle_Id,
	updateArticleByID
} = require("../models/article_model");

exports.sendArticles = (req, res, next) => {
	console.log("you are in the sendArticles controller function");
	fetchArticles(req.query)
		.then(articles => {
			res.status(200).send({ articles });
		})
		.catch(next);
};

exports.sendArticleByArticle_Id = (req, res, next) => {
	console.log("you are in the sendArticleByArticle_Id controller function");
	fetchArticleByArticle_Id(req.params)
		.then(article => {
			res.status(200).send({ article });
		})
		.catch(next);
};

exports.modifyArticleByID = (req, res, next) => {
	console.log("you are in the modifyArticleByID controller function");
	const contentToUpdate = req.body;
	updateArticleByID(req.params, contentToUpdate)
		.then(article => {
			res.status(200).send({ article });
		})
		.catch(next);
};
