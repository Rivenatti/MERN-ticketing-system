function changeTicketStatusQuery(ticketID, status) {
  return `UPDATE tickets 
      SET status = '${status}' 
      WHERE ticketID = ${ticketID}`;
}

module.exports = changeTicketStatusQuery;
