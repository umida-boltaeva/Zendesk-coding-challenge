const tickets = require("./tickets");

describe("views/tickets", () => {
  const data = {
    data: {
      tickets: [
        {
          id: "1",
          subject: "Sample ticket: Meet the ticket",
          status: "open",
          created_at: "2021-05-04T01:56:37Z",
        },
        {
          id: "2",
          subject: "I need help",
          status: "closed",
          created_at: "2021-05-04T02:57:10Z",
        },
      ],
      meta: {
        has_more: true,
      },
    },
  };
  let message;

  describe("when has_more is true", () => {
    beforeAll(() => {
      message = tickets(data);
    });

    it("includes column headings", () => {
      expect(message).toMatch("ID");
      expect(message).toMatch("Subject");
      expect(message).toMatch("Status");
      expect(message).toMatch("Created at");
    });

    it("includes each ticket's data", () => {
      expect(message).toMatch("1");
      expect(message).toMatch("Sample ticket: Meet the ticket");
      expect(message).toMatch("open");
      expect(message).toMatch("2021-05-04T01:56:37Z");

      expect(message).toMatch("2");
      expect(message).toMatch("I need help");
      expect(message).toMatch("closed");
      expect(message).toMatch("2021-05-04T02:57:10Z");
    });

    it("includes view more message", () => {
      expect(message).toMatch("... type '1' to view more tickets");
    });
  });

  describe("when has_more is false", () => {
    beforeAll(() => {
      message = tickets({
        data: {
          ...data.data,
          meta: {
            has_more: false,
          },
        },
      });
    });

    it("doesn't include view more message", () => {
      expect(message).not.toMatch("... type '1' to view more tickets");
    });
  });
});
