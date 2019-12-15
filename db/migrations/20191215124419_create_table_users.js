exports.up = function(knex) {
	console.log("create users table");
	return knex.schema.createTable("users", usersTable => {
		usersTable
			.string("username")
			.primary()
			.unique()
			.notNullable();
		usersTable.string("avatar-url");
		usersTable.string("name");
	});
};

exports.down = function(knex) {
	console.log("drop users table");
	return knex.schema.dropTable("users");
};
