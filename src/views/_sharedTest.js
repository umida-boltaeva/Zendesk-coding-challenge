function expectNonEmptyString(message) {
  it("returns a non-empty string", () => {
    expect(typeof message).toBe("string");
    expect(message).toMatch(/.+/);
  });
}

module.exports = { expectNonEmptyString };
