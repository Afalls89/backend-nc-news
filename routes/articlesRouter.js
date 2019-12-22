const articlesRouter = require("express").Router();
const { handle405s } = require("../errors/errors");
const {
	sendArticles,
	sendArticleByArticleId,
	modifyArticleByID
} = require("../controllers/article_controller");

const {
	sendCommentsByArticleId,
	uploadCommentByArticleId
} = require("../controllers/comment_controller");

articlesRouter
	.route("/")
	.get(sendArticles)
	.all(handle405s);

articlesRouter
	.route("/:article_id")
	.get(sendArticleByArticleId)
	.patch(modifyArticleByID)
	.all(handle405s);

articlesRouter
	.route("/:article_id/comments")
	.get(sendCommentsByArticleId)
	.post(uploadCommentByArticleId)
	.all(handle405s);

module.exports = articlesRouter;
