import { MongoClient } from 'mongodb';
import { URI } from './config.js';

const connection = new MongoClient(URI);

await connection.connect();

export default connection;
