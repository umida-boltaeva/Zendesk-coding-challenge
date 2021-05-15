const prompt = require("prompt");
const welcome = require("./views/welcome");
const menu = require("./views/menu");
const quit = require("./views/quit");
const tickets = require("./views/tickets");
const ticket = require("./views/ticket");
const api = require("./api");
const controller = require("./controller");

jest.mock("prompt");
jest.mock("./api");
jest.mock("./views/welcome");
jest.mock("./views/menu");
jest.mock("./views/quit");
jest.mock("./views/tickets");
jest.mock("./views/ticket");

// I don't want to see console log during the test.
global.console = { log: jest.fn() };

describe("controller", () => {
  beforeEach(() => {
    prompt.start.mockImplementation();

    welcome.mockImplementation(() => "welcome");
    menu.mockImplementation(() => "menu");
    quit.mockImplementation(() => "quit");
    tickets.mockImplementation(() => "tickets");
    ticket.mockImplementation(() => "ticket");
  });

  describe("should call all static view functions", () => {
    beforeEach(() => {
      prompt.get
        .mockImplementationOnce(() => Promise.resolve({ command: "menu" }))
        .mockImplementationOnce(() => Promise.resolve({ command: "quit" }));
    });

    it("welcome, menu, quit", () => {
      controller()
        .then(() => {
          // First time prompt will return quit command.
          expect(welcome).toHaveBeenCalledTimes(1);
          expect(menu).toHaveBeenCalled();
        })
        .then(() => {
          // This time prompt will return quit command.
          expect(quit).toHaveBeenCalled();
        })
        .catch((error) => console.log(error));
    });
  });

  // GET ALL TICKETS START.
  describe("get all tickets command (1)", () => {
    const apiResponse1 = {
      data: {
        tickets: [],
        meta: { has_more: true, after_cursor: "afterCursor1" },
      },
    };

    const apiResponse2 = {
      data: {
        tickets: [],
        meta: { has_more: false, after_cursor: "afterCursor2" },
      },
    };

    describe("user types 1 consecutively", () => {
      beforeEach(() => {
        prompt.get
          .mockImplementationOnce(() => Promise.resolve({ command: "1" }))
          .mockImplementationOnce(() => Promise.resolve({ command: "1" }))
          .mockImplementationOnce(() => Promise.resolve({ command: "1" }))
          .mockImplementationOnce(() => Promise.resolve({ command: "quit" }));

        api.getAllTickets
          .mockImplementationOnce(() => Promise.resolve(apiResponse1))
          .mockImplementationOnce(() => Promise.resolve(apiResponse2))
          .mockImplementationOnce(() => Promise.resolve(apiResponse1));
      });

      it("should paginate correctly", () => {
        controller()
          // User types 1 for the first time.
          .then(() => {
            expect(api.getAllTickets).toHaveBeenCalledWith(undefined);
          })
          .then(() => {
            expect(tickets).toHaveBeenCalledWith(apiResponse1);
          })

          // User types 1 for the second time.
          .then(() => {
            expect(api.getAllTickets).toHaveBeenCalledWith("afterCursor1");
          })
          .then(() => {
            expect(tickets).toHaveBeenCalledWith(apiResponse2);
          })

          // User types 1 for the third time.
          .then(() => {
            expect(api.getAllTickets).toHaveBeenCalledWith(null);
          })
          .then(() => {
            expect(tickets).toHaveBeenCalledWith(apiResponse1);
          })

          // User types quit.
          .then(() => {
            // This time prompt will return quit command.
            expect(quit).toHaveBeenCalled();
          })
          .catch((error) => console.log(error));
      });
    });

    describe("user types another command between two 1 commands", () => {
      beforeEach(() => {
        prompt.get
          .mockImplementationOnce(() => Promise.resolve({ command: "1" }))
          .mockImplementationOnce(() => Promise.resolve({ command: "menu" }))
          .mockImplementationOnce(() => Promise.resolve({ command: "1" }))
          .mockImplementationOnce(() => Promise.resolve({ command: "quit" }));

        api.getAllTickets.mockImplementation(() =>
          Promise.resolve(apiResponse1)
        );
      });

      it("should not continue through pagination", () => {
        controller()
          // User types 1 for the first time.
          .then(() => {
            expect(api.getAllTickets).toHaveBeenCalledWith(undefined);
          })
          .then(() => {
            expect(tickets).toHaveBeenCalledWith(apiResponse1);
          })

          // User types menu.
          .then(() => {
            expect(menu).toHaveBeenCalled();
          })

          // User types 1 for the second time.
          .then(() => {
            expect(api.getAllTickets).toHaveBeenCalledWith(null);
          })
          .then(() => {
            expect(tickets).toHaveBeenCalledWith(apiResponse1);
          })

          // User types quit.
          .then(() => {
            // This time prompt will return quit command.
            expect(quit).toHaveBeenCalled();
          })
          .catch((error) => console.log(error));
      });
    });
  });
  // GET ALL TICKETS END.

  describe("get one ticket", () => {
    const apiResponse = {
      data: {
        ticket: {},
      },
    };
    beforeEach(() => {
      prompt.get
        .mockImplementationOnce(() => Promise.resolve({ command: "2" }))
        .mockImplementationOnce(() => Promise.resolve({ id: "1" }))
        .mockImplementationOnce(() => Promise.resolve({ command: "quit" }));

      api.getTicket.mockImplementation(() => Promise.resolve(apiResponse));
    });

    it("should print a single ticket", () => {
      controller()
        // User types command 2.
        .then(() => {
          expect(prompt.get).toHaveBeenCalled();
        })
        // User types id.
        .then(() => {
          expect(api.getTicket).toHaveBeenCalledWith("1");
        })
        .then(() => {
          expect(ticket).toHaveBeenCalledWith(apiResponse);
        })

        // User types quit.
        .then(() => {
          // This time prompt will return quit command.
          expect(quit).toHaveBeenCalled();
        })
        .catch((error) => console.log(error));
    });
  });
});
