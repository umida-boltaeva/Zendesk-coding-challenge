const { expectNonEmptyString } = require("./_sharedTest");
const { menu } = require("./menu");

describe("views/menu", () => {
  expectNonEmptyString(menu());
});
