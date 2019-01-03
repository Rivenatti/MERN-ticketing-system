module.exports =
  "CREATE TABLE `tickets` ( `ticketID` SERIAL NOT NULL AUTO_INCREMENT , `userID` SMALLINT NOT NULL , `title` VARCHAR(100) NOT NULL , `description` VARCHAR(500) NOT NULL , `dateOfCreation` DATE NOT NULL  , `status` VARCHAR(100) NOT NULL , PRIMARY KEY (`ticketID`))";
