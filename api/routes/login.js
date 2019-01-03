// Require express router
const userLogin = require("express").Router();

// Require bcrypt for hashing
const bcrypt = require("bcryptjs");

// Require JSON Web Token
const jwt = require("jsonwebtoken");

// Require secret key
const secret = require("../../config/JWT_Secret");

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Import MySQL queries
const checkIfEmailExistsQuery = require("../MySQL_queries/registration/checkIfEmailExistsQuery");

// Create route to '/login'
userLogin.post("/login", (req, res, next) => {
  // Assign request values to the variables
  const { email, password } = req.body;

  // Check if all required fields are filled in
  if (!email) return res.status(400).json({ message: "Email field is empty." });
  else if (!password)
    return res.status(400).json({ message: "Password field is empty." });

  // Check if given email already exists
  MySQLConnection.query(checkIfEmailExistsQuery(email), (err, result) => {
    // Error handling
    if (err) res.status(500).json({ message: err });
    // If email doesn't exist show message
    else if (result.length === 0)
      res.status(409).json({ message: "Authentication failed." });
    // If email exists continue
    else {
      // Set result to first object of the returned object array
      result = result[0];
      // Compare requested password with user password
      bcrypt.compare(password, result.password, (err, confirm) => {
        if (err) return res.status(401).json({ message: "Bcrypt error." });
        else if (confirm) {
          // If success, assign token
          const token = jwt.sign(
            {
              userID: result.userID,
              firstName: result.firstName,
              lastName: result.lastName,
              email: result.email,
              created: result.created,
              role: result.role
            },
            secret,
            {
              expiresIn: "1h"
            }
          );
          // Send response

          return res
            .status(200)
            .json({ message: "Authentication successful", token });
        }

        // If comparing fails
        else return res.status(401).json({ message: "Authentication failed." });
      });
    }
  });
});

module.exports = userLogin;
