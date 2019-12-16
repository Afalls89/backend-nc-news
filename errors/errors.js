exports.handle405s = (req, res, next) => {
	res.status(405).send({ msg: "Method not allowed" });
};

exports.handle500s = (err, req, res, next) => {
	res.status(500).send({ msg: "Server Error" });
};
