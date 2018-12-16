module.exports = function emailExists(email) {
  return `SELECT * FROM users WHERE email="${email}"`;
};
