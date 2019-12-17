process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");
const knex = require("../db/connection");

const app = require("../app");

beforeEach(() => {
	return knex.seed.run();
});

after(() => {
	return knex.destroy();
});

describe("API Endpoints", () => {
	it("status: 404 returns object with message of Route not found", () => {
		return request(app)
			.get("/api/isNotAPath")
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).to.equal("Route not found");
			});
	});

	describe("/api", () => {
		describe("/topics", () => {
			describe("GET", () => {
				it("return status:200 with all topics ", () => {
					return request(app)
						.get("/api/topics")
						.expect(200)
						.then(({ body: { topics } }) => {
							expect(topics[0]).to.have.keys("slug", "description");
							expect(topics).to.be.an("array");
							expect(topics[0]).to.be.an("object");
						});
				});
			});

			describe("INVALID METHODS", () => {
				it("returns status: 405, with object containing message of  Method not allowed", () => {
					const invalidMethods = ["patch", "put", "delete", "post"];
					const promises = invalidMethods.map(method => {
						return request(app)
							[method]("/api/topics")
							.expect(405)
							.then(({ body: { msg } }) => {
								expect(msg).to.equal("Method not allowed");
							});
					});
					return Promise.all(promises);
				});
			});
		});

		describe("/users/:username", () => {
			describe("GET", () => {
				describe("INVALID METHODS", () => {
					it("returns status: 405, with object containing message of  Method not allowed", () => {
						const invalidMethods = ["patch", "put", "delete", "post"];
						const promises = invalidMethods.map(method => {
							return request(app)
								[method]("/api/users/butter_bridge")
								.expect(405)
								.then(({ body: { msg } }) => {
									expect(msg).to.equal("Method not allowed");
								});
						});
						return Promise.all(promises);
					});
				});

				it("return status:200 with an object containing info on the specified username ", () => {
					return request(app)
						.get("/api/users/butter_bridge")
						.expect(200)
						.then(({ body: { user } }) => {
							expect(user).to.have.keys("username", "avatar_url", "name");
							expect(user).to.be.an("object");
							expect(user.name).to.equal("jonny");
						});
				});

				it("return status: 404 if provided a valid entry which is not present in the database", () => {
					return request(app)
						.get("/api/users/UserNotInDB")
						.expect(404)
						.then(({ body: { msg } }) => {
							expect(msg).to.equal("No user found for username: UserNotInDB");
						});
				});
			});
		});

		describe("/articles", () => {
			describe("GET", () => {
				it("return status 200 and an object with key articles with value of an varray contianing all articles", () => {
					return request(app)
						.get("/api/articles")
						.expect(200)
						.then(({ body: { articles } }) => {
							expect(articles).to.be.an("array");
							expect(articles[0]).to.be.an("object");
							expect(articles[0]).to.have.keys(
								"article_id",
								"title",
								"created_at",
								"topic",
								"auther",
								"votes",
								"comment_count"
							);
						});
				});
			});
		});
	});
});
