// Require express router
const getNewTickets = require("express").Router();

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Import MySQL queries
const checkIfTicketsTableExistsQuery = require("../MySQL_queries/ticket/checkIfTicketsTableExistsQuery");
const getNewTicketsQuery = require("../MySQL_queries/ticket/getNewTicketsQuery");

// Create route to '/getTickets/new'
getNewTickets.post("/getTickets/new", (req, res, next) => {
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
      // Get ticket data from the db
      MySQLConnection.query(getNewTicketsQuery, (err, result) => {
        // Error handling
        if (err) res.status(500).json({ message: err });
        else res.status(201).json({ ticket: result });
      });
    }
  });
});

module.exports = getNewTickets;
