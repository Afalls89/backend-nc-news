const { fetchArticles } = require("../models/article_model");

exports.sendArticles = (req, res, next) => {
	console.log("you are in the sendArticles controller function");
	fetchArticles(req.query)
		.then(articles => {
			res.status(200).send({ articles });
		})
		.catch(next);
};
