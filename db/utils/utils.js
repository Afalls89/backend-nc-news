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
		newComment = {
			...comment,
			author: comment.created_by,
			article_id: articleRef[comment.belongs_to],
			created_at: new Date(comment.created_at)
		};
		delete newComment.created_by;
		delete newComment.belongs_to;
		return newComment;
	});
};
