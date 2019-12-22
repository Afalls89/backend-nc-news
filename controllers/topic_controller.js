const { fetchAllTopics } = require("../models/topic_model");

exports.sendAllTopics = (req, res, next) => {
	fetchAllTopics()
		.then(topics => {
			res.status(200).send({ topics });
		})
		.catch(next);
};
