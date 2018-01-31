const mongoose = require('mongoose');
const fs = require('fs');
const Grid = require('gridfs-stream');
const path = require('path');
const publicPath = path.join(__dirname, '../public/img/img1.jpg');
console.log(publicPath);
mongoose.connect('mongodb://localhost:27017/Auth').then(() => {
  console.log('Connected');
}, (err) => {
  console.log('Error');
});
Grid.mongo = mongoose.mongo;

mongoose.connection.once('open', () => {
  console.log('Entered');
  var gfs = Grid(mongoose.connection.db);

  var writestream = gfs.createWriteStream({
    filename: (Date.now() + '.jpg')
  });

  fs.createReadStream(publicPath).pipe(writestream);
  writestream.on('close', (file) => {
    console.log(file.filename);
  });
});