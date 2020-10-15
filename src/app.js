import express from 'express';
import indexRoutes from './routes';
import mongoose from 'mongoose';

const app = express();
require('dotenv').config();
const urlMongos = 'mongodb://dev:ru25cyPCZSeLi0JX@fandytic-shard-00-00.9ozjn.mongodb.net:27017,fandytic-shard-00-01.9ozjn.mongodb.net:27017,fandytic-shard-00-02.9ozjn.mongodb.net:27017/dev?ssl=true&replicaSet=atlas-13e007-shard-0&authSource=admin&retryWrites=true&w=majority' || process.env.MONGODB_URL;

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
