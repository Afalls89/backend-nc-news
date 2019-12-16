exports.formatDates = list => {
	if (list.length === 0) return [];
	return list.map(listObj => {
		const newListObj = { ...listObj };
		newListObj.created_at = new Date(newListObj.created_at);
		return newListObj;
	});
};

exports.makeRefObj = list => {
	if (list.length === 0) return {};
	return list.reduce((ref, listObj) => {
		ref[listObj.title] = listObj.article_id;
		return ref;
	}, {});
};

exports.formatComments = (comments, articleRef) => {
	if (comments.length === 0) return [];
	return comments.map(comment => {
		newComment = { ...comment };
		newComment.author = newComment.created_by;
		delete newComment.created_by;
		newComment.article_id = articleRef[newComment.belongs_to];
		delete newComment.belongs_to;
		newComment.created_at = new Date(newComment.created_at);
		return newComment;
	});
};
