import main from "./main";

describe("JustMainJestTest", () => {
  describe("do dis work?", () => {
    let result = "";
    beforeEach(() => {
      console.log("bubble");
      result = main();
    });

    it("it should return something", () => {
      expect(result).toBe("Hi world");
    });
  });
});
