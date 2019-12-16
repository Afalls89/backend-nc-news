const { fetchAllTopics } = require("../models/topic_model");

exports.sendAllTopics = (req, res, next) => {
	console.log("you are in the sendAllTopics controller function");
	fetchAllTopics()
		.then(topics => {
			res.status(200).send({ topics });
		})
		.catch(next);
};
