const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  apiUrl: process.env.API_URL,
  mongodbUsername: process.env.MONGODB_USERNAME,
  mongodbPassword: process.env.MONGODB_PASSWORD,
};