const mongoose = require('mongoose');

exports.connect = () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/database';
    mongoose.connect(mongoURI);

    console.log('Connection to mongo established successfully');
  } catch(e) {
    console.error('Connection to mongo could not be established');
    console.log(e);
  }
}
