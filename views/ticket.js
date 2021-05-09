const Table = require("cli-table3");
const { menu } = require("./menu");

function ticket(ticketData) {
  var table = new Table();
  const ticket = ticketData.data.ticket;

  table.push(
    { id: ticket.id },
    { url: ticket.url },
    { created_at: ticket.created_at },
    { updated_at: ticket.updated_at },
    { type: ticket.type },
    { subject: ticket.subject },
    { priority: ticket.priority },
    { status: ticket.status },
    { has_incidents: ticket.has_incidents },
    { is_public: ticket.is_public },
    { tags: ticket.tags.reduce((prev, curr) => `${prev}, ${curr}`) }

    // tags is an array. I used reduce method
    // to show its elements in the table beautifully.
  );

  // ticket.description is too long for the table.
  // So, I put it at the end of the table.

  return `${table.toString()}
  ${ticket.description}
  ${menu()}`;
}

module.exports = { ticket };
