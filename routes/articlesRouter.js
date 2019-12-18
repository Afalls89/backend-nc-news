const articlesRouter = require("express").Router();
const { handle405s } = require("../errors/errors");
const {
	sendArticles,
	sendArticleByArticle_Id,
	modifyArticleByID
} = require("../controllers/article_controller");

const {
	sendCommentsByArticle_Id
} = require("../controllers/comment_controller");

articlesRouter
	.route("/")
	.get(sendArticles)
	.all(handle405s);

articlesRouter
	.route("/:article_id")
	.get(sendArticleByArticle_Id)
	.patch(modifyArticleByID)
	.all(handle405s);

articlesRouter
	.route("/:article_id/comments")
	.get(sendCommentsByArticle_Id)
	.all(handle405s);

module.exports = articlesRouter;
