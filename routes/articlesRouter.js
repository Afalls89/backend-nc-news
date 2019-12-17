const articlesRouter = require("express").Router();
// const { handle405s } = require("../errors/errors");
const { sendAllArticles } = require("../controllers/article_controller");

articlesRouter.route("/").get(sendAllArticles);
// .all(handle405s);

module.exports = articlesRouter;
