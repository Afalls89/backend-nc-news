const commentsRouter = require("express").Router();
const { handle405s } = require("../errors/errors");
const {
	modifyCommentByComment_Id,
	removeCommentByComment_Id
} = require("../controllers/comment_controller");

commentsRouter
	.route("/:comment_id")
	.patch(modifyCommentByComment_Id)
	.delete(removeCommentByComment_Id)
	.all(handle405s);

module.exports = commentsRouter;
