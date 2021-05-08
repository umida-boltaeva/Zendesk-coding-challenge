const prompt = require("prompt");
const { menu } = require("./views/menu");
const { quit } = require("./views/quit");
const { welcome } = require("./views/welcome");
const { tickets } = require("./views/tickets");
const { ticket } = require("./views/ticket");
const { getAllTickets, getTicket } = require("./api");

const commandSchema = {
  properties: {
    command: {
      pattern: /^(1|2|menu|quit)$/,
      message: 'Wrong command! Please, type "menu" to see available commands',
      required: true,
    },
  },
};

const ticketIdSchema = {
  properties: {
    id: {
      pattern: /^\d+$/,
      message: "Wrong ID! Please, provide an integer",
      required: true,
    },
  },
};

prompt.start();

async function controller() {
  console.log(welcome());

  let afterCursor;

  while (true) {
    try {
      const { command } = await prompt.get(commandSchema);

      switch (command) {
        case "menu":
          console.log(menu());
          break;
        case "1":
          const ticketsData = await getAllTickets(afterCursor);
          afterCursor = ticketsData.data.meta.after_cursor;

          console.log(tickets(ticketsData));
          break;

        case "2":
          const { id } = await prompt.get(ticketIdSchema);
          const ticketData = await getTicket(id);
          console.log(ticket(ticketData));
          break;

        case "quit":
          console.log(quit());
          return;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { controller };
