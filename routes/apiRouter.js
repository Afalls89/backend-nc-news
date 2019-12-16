const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter");
const apiWelcomePage = require("../controllers/api_controller");

// apiRouter.get("/", apiWelcomePage);

apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
