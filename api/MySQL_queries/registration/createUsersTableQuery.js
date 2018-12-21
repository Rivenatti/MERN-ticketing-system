module.exports =
  "CREATE TABLE `users` ( `userID` SERIAL NOT NULL AUTO_INCREMENT , `firstName` VARCHAR(100) NOT NULL , `lastName` VARCHAR(100) NOT NULL , `email` VARCHAR(100) NOT NULL , `password` VARCHAR(100) NOT NULL , `role` VARCHAR(20) NOT NULL , `created` DATE NOT NULL  , PRIMARY KEY (`userID`), UNIQUE (`email`))";
