const Table = require("cli-table3");
const { menu } = require("./menu");

function tickets(ticketsData) {
  var table = new Table({
    head: ["ID", "Subject", "Status", "Priority", "Created at"],
  });

  table.push(
    ...ticketsData.data.tickets.map(
      ({ id, subject, status, priority, created_at }) => [
        id,
        subject,
        status,
        priority,
        created_at,
      ]
    )
  );
  return table.toString() + showHelperMessage(ticketsData.data.meta);
}

function showHelperMessage({ has_more }) {
  if (has_more) {
    return "\n... type '1' to view more tickets";
  } else {
    return menu();
  }
}

module.exports = { tickets };
