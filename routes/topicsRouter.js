const topicsRouter = require("express").Router();
const { sendAllTopics } = require("../controllers/topic_controller");
const { handle405s } = require("../errors/errors");

topicsRouter
	.route("/")
	.get(sendAllTopics)
	.all(handle405s);

module.exports = topicsRouter;
