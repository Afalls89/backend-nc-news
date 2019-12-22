const commentsRouter = require("express").Router();
const { handle405s } = require("../errors/errors");
const {
	modifyCommentByCommentId,
	removeCommentByCommentId
} = require("../controllers/comment_controller");

commentsRouter
	.route("/:comment_id")
	.patch(modifyCommentByCommentId)
	.delete(removeCommentByCommentId)
	.all(handle405s);

module.exports = commentsRouter;
