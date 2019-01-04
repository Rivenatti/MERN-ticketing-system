function selectTickets(ticketID) {
  return `SELECT * FROM tickets where ticketID = ${ticketID}`;
}

module.exports = selectTickets;
