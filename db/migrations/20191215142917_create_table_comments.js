exports.up = function(knex) {
	console.log("create comments table");
	return knex.schema.createTable("comments", commentsTable => {
		commentsTable.increments("comment_id").primary();
		commentsTable.string("auther").references("users.username");
		commentsTable.integer("article_id").references("articles.article_id");
		commentsTable.integer("votes").defaultTo(0);
		commentsTable.timestamp("created_at", { useTz: false });
		commentsTable.string("body", 2000);
	});
};

exports.down = function(knex) {
	console.log("drop comments table");
	return knex.schema.dropTable("comments");
};
