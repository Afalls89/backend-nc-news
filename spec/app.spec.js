process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
chai.use(chaiSorted);

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
			describe("INVALID METHODS", () => {
				it("returns status: 405, with object containing message of  Method not allowed", () => {
					const invalidMethods = ["put", "delete"];
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

			describe("GET", () => {
				it("return status 200 and an object with key articles with value of an varray contianing all articles", () => {
					return request(app)
						.get("/api/articles")
						.expect(200)
						.then(({ body: { articles } }) => {
							expect(articles).to.be.an("array");
							expect(articles[0]).to.be.an("object");
							expect(articles[0]).to.contain.keys(
								"article_id",
								"title",
								"created_at",
								"topic",
								"author",
								"votes"
							);
						});
				});

				it('"return status 200  and return array of articles sorted by defualt value of date', () => {
					return request(app)
						.get("/api/articles")
						.expect(200)
						.then(({ body: { articles } }) => {
							expect(articles).to.be.sortedBy("created_at");
						});
				});

				it('"return status 200  and return array of articles sorted by article_id', () => {
					return request(app)
						.get("/api/articles?sort_by=article_id")
						.expect(200)
						.then(({ body: { articles } }) => {
							expect(articles).to.be.sortedBy("article_id");
						});
				});

				it('"return status 200  and return array of articles sorted by votes', () => {
					return request(app)
						.get("/api/articles?sort_by=votes")
						.expect(200)
						.then(({ body: { articles } }) => {
							expect(articles).to.be.sortedBy("votes");
						});
				});

				it("returns status 200 and returns array of articles ordered by default which is descending", () => {
					return request(app)
						.get("/api/articles")
						.expect(200)
						.then(({ body: { articles } }) => {
							expect(articles).to.be.descendingBy("created_at");
						});
				});

				it("returns status 200 and returns array of articles ordered by ascending", () => {
					return request(app)
						.get("/api/articles?order=asc")
						.expect(200)
						.then(({ body: { articles } }) => {
							expect(articles).to.be.ascendingBy("created_at");
						});
				});

				it("returns status 200 and returns array of articles where auther is filtered by username", () => {
					return request(app)
						.get("/api/articles?author=butter_bridge")
						.expect(200)
						.then(({ body: { articles } }) => {
							expect(articles[1].author).to.equal("butter_bridge");
							expect(articles.length).to.equal(3);
						});
				});

				it("returns status 200 and returns array of articles where topic is filtered by topic quesry value", () => {
					return request(app)
						.get("/api/articles?topic=cats")
						.expect(200)
						.then(({ body: { articles } }) => {
							expect(articles[0].topic).to.equal("cats");
							expect(articles.length).to.equal(1);
						});
				});
			});
		});
	});
});
