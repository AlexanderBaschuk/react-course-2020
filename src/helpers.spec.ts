import { calcSum } from "./helpers";

describe("helpers.calcSum", () => {
	it("should add two numbers", () => {
		expect(calcSum(1, 2)).toBe(3)
	});
});
