const topicsRouter = require("express").Router();
const { sendAllTopics } = require("../controllers/topic_controller");

topicsRouter.use("/", sendAllTopics);

module.exports = topicsRouter;
