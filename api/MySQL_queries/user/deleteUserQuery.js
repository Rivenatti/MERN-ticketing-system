function deleteUserQuery(userID) {
  return `DELETE FROM users 
        WHERE userID = ${userID}`;
}

module.exports = deleteUserQuery;
