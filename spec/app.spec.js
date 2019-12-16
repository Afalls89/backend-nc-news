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

describe("/api", () => {
	describe("/topics", () => {
		describe("GET", () => {
			it("return status:200 with all topics ", () => {
				return request(app)
					.get("/api/topics")
					.expect(200)
					.then(({ body: { topics } }) => {
						console.log(topics);
						expect(topics[0]).to.have.keys("slug", "description");
					});
			});
		});
	});
});
