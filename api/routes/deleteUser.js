// Require express router
const deleteUser = require("express").Router();

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Require authentication middleware
const checkAuth = require("../../middleware/checkAuth");

// Import MySQL queries
const checkIfUsersTableExistsQuery = require("../MySQL_queries/user/checkIfUsersTableExistsQuery");
const deleteUserQuery = require("../MySQL_queries/user/deleteUserQuery");

// Create route to '/delete/:id'
deleteUser.post("/deleteUser/:id", checkAuth, (req, res, next) => {
  // Check if user table exists in the database
  MySQLConnection.query(checkIfUsersTableExistsQuery, (err, result) => {
    // Error handling
    if (err) res.status(500).json({ message: err });
    // If user table doesn't exist, throw error message
    else if (result.length === 0) {
      res
        .status(400)
        .json({ message: "User table doesn't exist in the database." });
    } else {
      // delete user from the db
      MySQLConnection.query(deleteUserQuery(req.params.id), (err, result) => {
        // Error handling
        if (err) console.log(err);
        else res.status(201).json({ user: result });
      });
    }
  });
});

module.exports = deleteUser;
