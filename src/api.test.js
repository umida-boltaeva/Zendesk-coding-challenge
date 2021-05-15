const axios = require("axios").default;
const { getAllTickets, getTicket } = require("./api");

jest.mock("axios");

// Common parts for both function tests //
const response = {
  data: "dummy data",
};

beforeEach(() => {
  axios.mockImplementation(() => Promise.resolve(response));
});
////////////

describe("getAllTickets", () => {
  const axiosParam = {
    method: "get",
    url: "https://macos.zendesk.com/api/v2/tickets.json?page[size]=25",
    responseType: "json",
    auth: {
      username: expect.anything(),
      password: expect.anything(),
    },
  };

  describe("when afterCursor is undefined", () => {
    it("calls axios function with correct params", () => {
      getAllTickets();
      expect(axios).toHaveBeenCalledWith(axiosParam);
    });

    it("returns a promise", () => {
      getAllTickets().then((data) =>
        expect(data).toEqual({
          data: "dummy data",
        })
      );
    });
  });

  describe("when afterCursor is defined", () => {
    it("calls axios function with correct params", () => {
      getAllTickets("afterCursor");
      expect(axios).toHaveBeenCalledWith({
        ...axiosParam,
        url: "https://macos.zendesk.com/api/v2/tickets.json?page[size]=25&page[after]=afterCursor",
      });
    });
  });
});

// Test single ticket function

describe("getTicket", () => {
  const axiosParam = {
    method: "get",
    url: "https://macos.zendesk.com/api/v2/tickets/23",
    responseType: "json",
    auth: {
      username: expect.anything(),
      password: expect.anything(),
    },
  };

  it("calls axios function with correct params", () => {
    getTicket(23);
    expect(axios).toHaveBeenCalledWith(axiosParam);
  });

  it("returns a promise", () => {
    getTicket("23").then((data) =>
      expect(data).toEqual({
        data: "dummy data",
      })
    );
  });
});
