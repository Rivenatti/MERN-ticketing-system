function getMessagesQuery(ticketID) {
  return `SELECT m.id, m.message, u.firstName, u.lastName, m.date
  FROM messages m
  LEFT JOIN users u ON m.userID = u.userID
  WHERE ticketID = ${ticketID};`;
}

module.exports = getMessagesQuery;
