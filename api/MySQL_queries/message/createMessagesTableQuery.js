module.exports = `CREATE TABLE messages ( 
        ID SERIAL NOT NULL AUTO_INCREMENT , 
        userID INT NOT NULL , 
        ticketID INT NOT NULL , 
        message VARCHAR(500) NOT NULL , 
        date date NOT NULL ,
        PRIMARY KEY (ID),
        FOREIGN KEY (userID) REFERENCES users(userID),
        FOREIGN KEY (ticketID) REFERENCES tickets(ticketID)
        );`;
