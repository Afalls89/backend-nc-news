const articles = require("./articles");
const topics = require("./topics");
const comments = require("./comments");
const users = require("./users");

const devData = {
	topicData: topics,
	articleData: articles,
	userData: users,
	commentData: comments
};

module.exports = devData;
