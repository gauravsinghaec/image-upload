const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

var UserShcema = new Schema({
    username: {
        type: String,
        unique: true,
        minlength: 3,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    images: {
        type: Array
    }
});

var User = mongoose.model('users', UserShcema);

module.exports = User;

module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(11, (err, salt) => {
        if (err) {
            console.log('Some error occured while salting.', err);
            callback(err, undefined);
            return;
        }
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log('Some error occured while hashing the password', err);
                callback(err, undefined);
                return;
            }
            newUser.password = hash;
            newUser.save().then((data) => {
                console.log('Saved from user model', data);
                callback(err, data);
                return;
            }, (err) => {
                console.log('Unable to save user', err);
                callback(err, undefined);
                return;
            });
        });
    });
}