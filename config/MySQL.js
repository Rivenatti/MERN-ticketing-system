if (process.env.NODE_ENV === "development") {
  MySQL_config = require("./config").MySQL_config;
} else {
  //----- MySQL config
  MySQL_config = {
    host: "",
    user: "",
    password: "",
    database: ""
  };
}

// Require mysql
const mysql = require("mysql");

// Connection settings
const MySQLConnection = mysql.createConnection(MySQL_config);

// Create connection
MySQLConnection.connect(err => {
  if (err) console.log("MySQL Error: " + err);
  else console.log("MySQL connected...");
});

// MySQL server timeout error
MySQLConnection.on("error", err => console.log("MySQL connection timeout."));

module.exports = MySQLConnection;
