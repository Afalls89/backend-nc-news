exports.up = function(knex) {
	console.log("create articles table");
	return knex.schema.createTable("articles", articlesTable => {
		articlesTable.increments("article_id").primary();
		articlesTable.string("title");
		articlesTable.string("body", 2000);
		articlesTable.integer("votes").defaultTo(0);
		articlesTable.string("topic").references("topics.slug");
		articlesTable.string("author").references("users.username");
		articlesTable.timestamp("created_at", { useTz: false });
	});
};

exports.down = function(knex) {
	console.log("drop articles table");
	return knex.schema.dropTable("articles");
};