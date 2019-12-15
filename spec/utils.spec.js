process.env.NODE_ENV = "test";

const { expect } = require("chai");
const {
	formatDates,
	makeRefObj,
	formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
	it("if provided an empty array return a new empty array ", () => {
		const data = [];

		expect(formatDates(data)).to.deep.equal([]);
		expect(formatDates(data)).to.not.equal(data);
		expect(formatDates(data)).to.be.an("Array");
	});

	it("if given an array of objects, return new array of objects without manuipulating the originals", () => {
		const data = [
			{
				title: "Living in the shadow of a great man",
				topic: "mitch",
				author: "butter_bridge",
				body: "I find this existence challenging",
				created_at: 1542284514171,
				votes: 100
			}
		];

		formatDates(data);

		expect(data).to.deep.equal([
			{
				title: "Living in the shadow of a great man",
				topic: "mitch",
				author: "butter_bridge",
				body: "I find this existence challenging",
				created_at: 1542284514171,
				votes: 100
			}
		]);
	});

	it("if provided an array with one object. the value for key 'created_at' should be changed from unix timestamp to standard timestamp format", () => {
		const data = [
			{
				title: "Living in the shadow of a great man",
				topic: "mitch",
				author: "butter_bridge",
				body: "I find this existence challenging",
				created_at: 1542284514171,
				votes: 100
			}
		];

		expect(`${formatDates(data)[0].created_at}`).to.equal(
			"Thu Nov 15 2018 12:21:54 GMT+0000 (Greenwich Mean Time)"
		);
	});

	it("if provided an array with multiple objects. the value for key 'created_at' should be changed from unix timestamp to standard timestamp format", () => {
		const data = [
			{
				title: "Living in the shadow of a great man",
				topic: "mitch",
				author: "butter_bridge",
				body: "I find this existence challenging",
				created_at: 1542284514171,
				votes: 100
			},
			{
				title: "Sony Vaio; or, The Laptop",
				topic: "mitch",
				author: "icellusedkars",
				body:
					"Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
				created_at: 1416140514171
			}
		];

		expect(`${formatDates(data)[1].created_at}`).to.equal(
			"Sun Nov 16 2014 12:21:54 GMT+0000 (Greenwich Mean Time)"
		);
	});
});

describe.only("makeRefObj", () => {
	it("if provided an empty array return an empty object ", () => {
		const articles = [];

		expect(makeRefObj(articles)).to.deep.equal({});
		expect(makeRefObj(articles)).to.be.an("object");
	});

	it("if provided an array of objects , return a new object without manipulating the originals", () => {
		const articles = [
			{
				article_id: 1,
				title: "Living in the shadow of a great man",
				topic: "mitch",
				author: "butter_bridge",
				body: "I find this existence challenging",
				created_at: 1542284514171,
				votes: 100
			}
		];

		makeRefObj(articles);

		expect(articles).to.deep.equal([
			{
				article_id: 1,
				title: "Living in the shadow of a great man",
				topic: "mitch",
				author: "butter_bridge",
				body: "I find this existence challenging",
				created_at: 1542284514171,
				votes: 100
			}
		]);
	});

	it("if provided with an array of objects, return a new object with the key/value pair of title: article_id", () => {
		const articles = [
			{
				article_id: 1,
				title: "Living in the shadow of a great man",
				topic: "mitch",
				author: "butter_bridge",
				body: "I find this existence challenging",
				created_at: 1542284514171,
				votes: 100
			},
			{
				article_id: 2,
				title: "Sony Vaio; or, The Laptop",
				topic: "mitch",
				author: "icellusedkars",
				body:
					"Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
				created_at: 1416140514171
			}
		];

		expect(makeRefObj(articles)).to.deep.equal({
			"Living in the shadow of a great man": 1,
			"Sony Vaio; or, The Laptop": 2
		});
	});
});

describe("formatComments", () => {});
