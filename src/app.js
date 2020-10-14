import express from 'express';
import indexRoutes from './routes';
import mongoose from 'mongoose';

const app = express();
require('dotenv').config();
const urlMongos = 'mongodb+srv://dev:obE0ZApNOC9M3xsC@fandytic.9ozjn.mongodb.net/dev?retryWrites=true&w=majority' || process.env.MONGODB_URL;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(urlMongos, dbOptions);
const db = mongoose.connection;

if (!db) {
  console.log('Error connecting to db');
}
if(db){
  console.log('Success connecting to db');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json() );

indexRoutes(app);

const server = require('http').Server(app);

module.exports = server;
