const articlesRouter = require("express").Router();
// const { handle405s } = require("../errors/errors");
const { sendArticles } = require("../controllers/article_controller");

articlesRouter.route("/").get(sendArticles);
// .all(handle405s);

module.exports = articlesRouter;
