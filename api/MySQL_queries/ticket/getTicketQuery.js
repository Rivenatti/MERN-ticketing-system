function getTicketQuery(ticketID) {
  return `SELECT * FROM tickets where ticketID = ${ticketID}`;
}

module.exports = getTicketQuery;
