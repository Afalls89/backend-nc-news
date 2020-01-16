const DB_URL =
	"postgres://eevqnrscmqdjhq:955fae58d9d27edb5dc38dada0497dffe39e80430cab1318bc0f15780ec7cb62@ec2-54-163-234-44.compute-1.amazonaws.com:5432/dfhu4bob6nqu6e";
const ENV = process.env.NODE_ENV || "development";

const { username, password } = require("./credentials");

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
			database: `${DB_URL}?ssl=true`
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
