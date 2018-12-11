if (process.env.NODE_ENV === "development") {
  module.exports = require("./config").JWT_SECRET;
} else {
  module.exports = process.env.JWT_SECRET;
}
