const articlesRouter = require("express").Router();
const { handle405s } = require("../errors/errors");
const {
	sendArticles,
	sendArticleByArticle_Id
} = require("../controllers/article_controller");

articlesRouter
	.route("/")
	.get(sendArticles)
	.get(sendArticleByArticle_Id)
	.all(handle405s);

module.exports = articlesRouter;
