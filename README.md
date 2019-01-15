# MERN Ticketing System

This is a ticketing system project. This project was created in purpose to learn and practice MERN stack (MySQL, Express, React.js, Node.js) with Redux.js. This full-stack web application was created with use of technologies listed below:

- BACKEND:
  Node.js, Express.js, MySQL, JSON Web Token, React-cookies

- FRONTEND:
  React, React-router, Redux, Axios, Material-UI

Application is a fully working ticketing system which allows user to: register, login on the own account, "CRUD" tickets stored in the database, display information about his/her account and delete the account. For security and user authentication I have used JSON Web Token which is stored in the browser's cookies. To hash passwords I have used bcrypt.js.

## Get started

- Install all project dependencies:

  > npm run install-all

- Localhost configuration:

  > fill in MySQL connection object in 'config/config.js'
  
  > fill in JWT_SECRET in 'config/config.js'

- If project running on server set config vars:

  > 'MySQL_config' object (exactly the same way as it is saved in config.js file)
  
  > 'JWT_SECRET' (exactly the same way as it is saved in config.js file)

- Start the development server and client at once with:
  > npm run dev

### Client is running on port 3000.

### Server is running on port 5000.

#

The replication, conversion, duplication or divulgement of the whole application in order to benefit from it in any way is prohibited without the author's permission.
