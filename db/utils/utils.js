exports.formatDates = list => {
	if (list.length === 0) return [];
	return list.map(listObj => {
		const newListObj = { ...listObj };
		newListObj.created_at = new Date(newListObj.created_at);
		return newListObj;
	});
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
