// Require express router
const registerUser = require("express").Router();

// Require bcrypt.js
const bcrypt = require("bcryptjs");

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Import MySQL queries
const checkIfUsersTableExistsQuery = require("../MySQL_queries/registration/checkIfUsersTableExistsQuery");
const insertUserQuery = require("../MySQL_queries/registration/insertUserQuery");
const checkIfEmailExistsQuery = require("../MySQL_queries/registration/checkIfEmailExistsQuery");

// Create route to '/register'
registerUser.post("/register", (req, res) => {
  // Assign request values to the variables
  const { firstName, lastName, email, password } = req.body;

  // Check if all required fields are filled in
  if (!firstName)
    return res.status(400).json({ message: "Firstname field is empty." });
  else if (!lastName)
    return res.status(400).json({ message: "Lastname field is empty." });
  else if (!email)
    return res.status(400).json({ message: "Email field is empty." });
  else if (!password)
    return res.status(400).json({ message: "Password field is empty." });

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
      // Create new user object
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        role: "user",
        created: new Date()
      };

      // Check if given email already exists
      MySQLConnection.query(checkIfEmailExistsQuery(email), (err, result) => {
        // Error handling
        if (err) res.status(500).json({ message: err });
        // If email exists show message
        else if (result.length > 0)
          res.status(409).json({ message: "Given email already exists." });
        // If email doesn't exist add new user to the database
        else {
          // Encrypt the password
          bcrypt.genSalt(10, (err, salt) => {
            if (err) res.status(500).json({ message: err });
            else {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) res.status(500).json({ message: err });
                else {
                  newUser.password = hash;

                  // Insert new user to the db
                  MySQLConnection.query(
                    insertUserQuery,
                    newUser,
                    (err, result) => {
                      // Error handling
                      if (err) res.status(500).json({ message: err });
                      else
                        res
                          .status(201)
                          .json({ message: "User has been created." });
                    }
                  );
                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports = registerUser;
