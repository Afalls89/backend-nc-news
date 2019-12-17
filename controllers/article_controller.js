const { fetchAllArticles } = require("../models/article_model");

exports.sendAllArticles = (req, res, next) => {
	console.log("you are in the sendAllArticles controller function");
	fetchAllArticles(req.query)
		.then(articles => {
			res.status(200).send(articles);
		})
		.catch(next);
};
