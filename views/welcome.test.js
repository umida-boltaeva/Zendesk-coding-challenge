const { welcome } = require("./welcome");

describe("views/welcome", () => {
  it("returns a non-empty string", () => {
    expect(typeof welcome()).toBe("string");
    expect(welcome()).toMatch(/.+/);
  });
});
