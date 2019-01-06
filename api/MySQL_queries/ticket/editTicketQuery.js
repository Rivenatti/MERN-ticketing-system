function editTicketQuery(ticketID, title, description, dateofCreation, status) {
  return `UPDATE tickets 
    SET title = '${title}', description = '${description}', dateOfCreation = '${dateofCreation}', status = '${status}' 
    WHERE ticketID = ${ticketID}`;
}

module.exports = editTicketQuery;
