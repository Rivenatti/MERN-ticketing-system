// Require express router
const ticketCancelled = require("express").Router();

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Import MySQL queries
const checkIfTicketsTableExistsQuery = require("../MySQL_queries/ticket/checkIfTicketsTableExistsQuery");
const cancellTicketQuery = require("../MySQL_queries/ticket/cancellTicketQuery");

// Create route to '/cancell/:id'
ticketCancelled.post("/cancell/:id", (req, res, next) => {
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
      // cancel ticket from the db
      MySQLConnection.query(cancelTicketQuery(req.params.id), (err, result) => {
        // Error handling
        if (err) console.log(err);
        else res.status(201).json({ ticket: result });
      });
    }
  });
});

module.exports = ticketCancelled;
