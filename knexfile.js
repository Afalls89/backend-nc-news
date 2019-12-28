const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const {
	username,
	password,
	usernameHeroku,
	passwordHeroku
} = require("./credentials");

const baseConfig = {
	client: "pg",
	migrations: {
		directory: "./db/migrations"
	},
	seeds: {
		directory: "./db/seeds"
	}
};

const customConfig = {
	production: {
		connection: {
			database: `${DB_URL}?ssl=true`,
			username: usernameHeroku,
			password: passwordHeroku
		}
	},
	development: {
		connection: {
			database: "nc_news",
			username: username,
			password: password
		}
	},
	test: {
		connection: {
			database: "nc_news_test",
			username: username,
			password: password
		}
	}
};

module.exports = { ...customConfig[ENV], ...baseConfig };
