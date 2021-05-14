const { expectNonEmptyString } = require("./_sharedTest");
const { welcome } = require("./welcome");

describe("views/welcome", () => {
  expectNonEmptyString(welcome());
});
