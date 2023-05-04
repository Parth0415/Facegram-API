const {connect, connection} = require ('mongoose');
// creating the db call facegramDB
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/faceGramDB';

connect(connectionString);

module.exports = connection;