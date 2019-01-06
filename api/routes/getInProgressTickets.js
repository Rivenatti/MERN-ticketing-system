// Require express router
const getInProgressTickets = require("express").Router();

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Import MySQL queries
const checkIfTicketsTableExistsQuery = require("../MySQL_queries/ticket/checkIfTicketsTableExistsQuery");
const getInProgressTicketsQuery = require("../MySQL_queries/ticket/getInProgressTicketsQuery");

// Create route to '/getTickets/inProgress'
getInProgressTickets.post("/getTickets/inProgress", (req, res, next) => {
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
      MySQLConnection.query(getInProgressTicketsQuery, (err, result) => {
        // Error handling
        if (err) res.status(500).json({ message: err });
        else res.status(201).json({ ticket: result });
      });
    }
  });
});

module.exports = getInProgressTickets;
