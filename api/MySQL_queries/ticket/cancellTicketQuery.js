function cancellTicketQuery(ticketID) {
  return `UPDATE tickets
        SET status = 'cancelled' 
        WHERE ticketID = ${ticketID}`;
}

module.exports = cancellTicketQuery;
