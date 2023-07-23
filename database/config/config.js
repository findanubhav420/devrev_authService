require('dotenv').config();

module.exports={
  // "development": {
  //   "username": "pdycxrdc",
  //   "password": "QwTPjhlEox7UFc6jLNedmuQ8gQRr8pwH",
  //   "database": "pdycxrdc",
  //   "host": "trumpet.db.elephantsql.com",
  //   "dialect": "postgres"
  // },
  "development": {
    "username": "postgres",
    "password": "123456",
    "database": "auth_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "123456",
    "database": "auth_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    // "username": "pdycxrdc",
    // "password": "QwTPjhlEox7UFc6jLNedmuQ8gQRr8pwH",
    // "database": "pdycxrdc",
    // "host": "trumpet.db.elephantsql.com",
    // "dialect": "postgres"
    "username": "postgres",
    "password": "123456",
    "database": "auth_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
};
