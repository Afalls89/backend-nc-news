// const { fetchAllEndpoints } = require("../models/api_model");
const endpoints = require("../endpoints.json");

exports.sendAllEndpoints = (req, res, next) => {
	console.log("you have reached the sendAllEndpoints controlle function");
	return res.status(200).send(endpoints);
};
