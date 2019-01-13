module.exports = `CREATE TABLE tickets (
    ticketID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(500) NOT NULL,
    dateOfCreation DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID)
    );`;
