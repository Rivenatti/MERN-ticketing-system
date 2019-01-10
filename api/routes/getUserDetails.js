// Require express router
const getUser = require("express").Router();

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Import MySQL queries
const checkIfUsersTableExistsQuery = require("../MySQL_queries/user/checkIfUsersTableExistsQuery");
const getUserQuery = require("../MySQL_queries/user/getUserQuery");

// Create route to '/getUser/:id'
getUser.post("/getUser/:id", (req, res, next) => {
  // Check if users table exists in the database
  MySQLConnection.query(checkIfUsersTableExistsQuery, (err, result) => {
    // Error handling
    if (err) res.status(500).json({ message: err });
    // If users table doesn't exist, throw error message
    else if (result.length === 0) {
      res
        .status(400)
        .json({ message: "Users table doesn't exist in the database." });
    } else {
      // Get ticket data from the db
      MySQLConnection.query(getUserQuery(req.params.id), (err, result) => {
        // Error handling
        if (err) res.status(500).json({ message: err });
        else res.status(201).json({ user: result });
      });
    }
  });
});

module.exports = getUser;
