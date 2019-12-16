const usersRouter = require("express").Router();
const { handle405s } = require("../errors/errors");
const { sendUserByUsername } = require("../controllers/user_controller");

usersRouter
	.route("/:username")
	.get(sendUserByUsername)
	.all(handle405s);

module.exports = usersRouter;
