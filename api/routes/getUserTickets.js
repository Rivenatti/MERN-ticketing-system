// Require express router
const getUserTickets = require("express").Router();

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Require authentication middleware
const checkAuth = require("../../middleware/checkAuth");

// Import MySQL queries
const checkIfTicketsTableExistsQuery = require("../MySQL_queries/ticket/checkIfTicketsTableExistsQuery");
const getUserTicketsQuery = require("../MySQL_queries/ticket/getUserTicketsQuery");

// Create route to '/login'
getUserTickets.post("/getUserTickets", checkAuth, (req, res, next) => {
  // Assign request values to the variables
  const { userID } = req.body;

  // Check if tickets table exists in the database
  MySQLConnection.query(checkIfTicketsTableExistsQuery, (err, result) => {
    // Error handling
    if (err) res.status(500).json({ message: err });
    // If tickets table doesn't exist, throw error message
    else if (result.length === 0) {
      res
        .status(400)
        .json({ message: "Tickets table doesn't exist in the database." });
    } else {
      // Insert new ticket to the db
      MySQLConnection.query(getUserTicketsQuery(userID), (err, result) => {
        // Error handling
        if (err) res.status(500).json({ message: err });
        else res.status(201).json({ tickets: result });
      });
    }
  });
});

module.exports = getUserTickets;
