const { expectNonEmptyString } = require("./_sharedTest");
const { quit } = require("./quit");

describe("views/quit", () => {
  expectNonEmptyString(quit());
});
