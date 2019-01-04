function selectTickets(userID) {
  return `SELECT * FROM tickets where userID = ${userID}`;
}

module.exports = selectTickets;
