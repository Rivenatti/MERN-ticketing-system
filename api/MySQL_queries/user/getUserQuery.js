function getUserQuery(userID) {
  return `SELECT * FROM users where userID = ${userID}`;
}

module.exports = getUserQuery;
