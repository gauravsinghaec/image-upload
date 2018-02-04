const mongoose = require('mongoose');

const keys = require('../keys');

mongoose.connect('mongodb://localhost:27017/Auth').then(() => {
  console.log('Connected');
}, (err) => {
  console.log('Error connecting to database.');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;