exports.handle405s = (req, res, next) => {
	res.status(405).send({ msg: "Method not allowed" });
};

exports.handle404s = (err, req, res, next) => {
	if (err.status) res.status(err.status).send({ msg: err.msg });
	else next(err);
};

exports.handle400s = (err, req, res, next) => {
	const psqlBadRequestCodes = ["22P02", "42703"];
	if (psqlBadRequestCodes.includes(err.code))
		res.status(400).send({ msg: "Bad Request" });
	else next(err);
};

exports.handle500s = (err, req, res, next) => {
	console.log(err, ">>>>>>>>>>>>>>>>>..");
	res.status(500).send({ msg: "Server Error" });
};
