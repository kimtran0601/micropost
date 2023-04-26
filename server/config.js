const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5050,
  env: process.env.NODE_ENV,
  apiUrl: process.env.API_URL,
  mongodbUsername: process.env.MONGODB_USERNAME,
  mongodbPassword: process.env.MONGODB_PASSWORD,
  mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://qU45zozPfPO46l3j:6ljAlwExCw9AWqFG@micropost.njnitnw.mongodb.net/test',
};