// const dotenv = require("dotenv");
// const axios = require("axios").default;

import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const baseUrl = "https://macos.zendesk.com/api/v2/";

const auth = {
  username: process.env.MY_EMAIL,
  password: process.env.MY_PASSWORD,
};

export async function getAllTickets(afterCursor) {
  let url = `${baseUrl}tickets.json?page[size]=25`;
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

export async function getTicket(id) {
  return await axios({
    method: "get",
    url: `${baseUrl}tickets/${id}`,
    responseType: "json",
    auth: auth,
  });
}
