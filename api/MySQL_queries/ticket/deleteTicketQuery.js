function deleteTicketQuery(ticketID) {
  return `DELETE FROM tickets 
      WHERE ticketID = ${ticketID}`;
}

module.exports = deleteTicketQuery;
