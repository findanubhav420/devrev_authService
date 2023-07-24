const path = require('path');
const envPath = path.join(__dirname, '../../.env');
require('dotenv').config({ path: envPath });

module.exports={
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
    "username": "postgres",
    "password": "123456",
    "database": "auth_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
};
