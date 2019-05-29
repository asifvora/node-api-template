const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const databaseName = 'asif-mern-app';
const username = 'asifvora';
const password = 'asifvora2743';
const MONGODB_URI = `mongodb://${username}:${password}@ds047207.mlab.com:47207/${databaseName}`;

const options = {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  useNewUrlParser: true,
  useCreateIndex: true
};

// if (!process.env.MONGODB_URI) {
//   console.log('Please set MONGO_URI');
//   process.exit(-1);
// }

mongoose.connect(process.env.MONGODB_URI || MONGODB_URI, options);

// mongoose.connect(process.env.MONGODB_URI, {
//   auth: {
//     user: username,
//     password: password
//   },
//   options,
// });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
  process.exit(-1);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = mongoose;
