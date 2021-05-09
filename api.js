const dotenv = require("dotenv");
const axios = require("axios").default;

dotenv.config();

const baseUrl = "https://macos.zendesk.com/api/v2/";

const auth = {
  username: process.env.MY_EMAIL,
  password: process.env.MY_PASSWORD,
};

async function getAllTickets(afterCursor) {
  let url = `${baseUrl}tickets.json?page[size]=25`; //changed the size to 25 on a page.

  if (afterCursor != null) {
    url = `${url}&page[after]=${afterCursor}`;
  }
  return await axios({
    method: "get",
    url: url,
    responseType: "json",
    auth: auth,
  });
}

async function getTicket(id) {
  return await axios({
    method: "get",
    url: `${baseUrl}tickets/${id}`,
    responseType: "json",
    auth: auth,
  });
}

module.exports = {
  getAllTickets,
  getTicket,
};

// module is a code that allows to share and reuse the code
// breaking it into small chunks.
