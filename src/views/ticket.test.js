const ticket = require("./ticket");

describe("views/ticket", () => {
  const message = ticket({
    data: {
      ticket: {
        id: 1,
        url: "https://example.com",
        created_at: "2021-05-04T03:10:01Z",
        updated_at: "2021-05-04T03:10:01Z",
        type: "random type",
        subject: "velit eiusmod reprehenderit officia cupidatat",
        priority: "normal",
        status: "open",
        has_incidents: false,
        is_public: "true",
        tags: ["est", "incididunt", "nisi"],
        description:
          "Aute ex sunt culpa ex ea esse sint cupidatat aliqua ex consequat sit reprehenderit",
      },
    },
  });

  function includesKeyValue(key, value) {
    it(`includes ${key} key and its value`, () => {
      expect(message).toMatch(key);
      expect(message).toMatch(value);
    });
  }

  includesKeyValue("id", "1");
  includesKeyValue("url", "https://example.com");
  includesKeyValue("created_at", "2021-05-04T03:10:01Z");
  includesKeyValue("updated_at", "2021-05-04T03:10:01Z");
  includesKeyValue("type", "random type");
  includesKeyValue("subject", "velit eiusmod reprehenderit officia cupidatat");
  includesKeyValue("priority", "normal");
  includesKeyValue("status", "open");
  includesKeyValue("has_incidents", "false");
  includesKeyValue("is_public", "true");
  includesKeyValue("tags", "est, incididunt, nisi");

  it("inclues description's value", () => {
    expect(message).toMatch(
      "Aute ex sunt culpa ex ea esse sint cupidatat aliqua ex consequat sit reprehenderit"
    );
  });
});
