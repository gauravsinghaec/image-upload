const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const router = express.Router();

const User = require('../models/user');
const upload = require('../uploads/uploadFile');
const keys = require('../keys');

router.post('/', (req, res) => {
    console.log('Request');
    upload(req, res, (err) => {
        if (!err) {
            console.log('File information: ', req.file);
            jwt.verify(req.cookies.tk, keys.secret, (err, result1) => {
                if (err) {
                    res.render('login', {
                        login: 'enable'
                    });
                }
                User.findById(result1.user).then((result2) => {
                    console.log('Result', result2);
                    var images = result2.images;
                    images.push(req.file.filename);
                    User.findByIdAndUpdate(result2.id, { $set: { images } }).then((result3) => {
                        req.flash('message', 'Image uploaded successfully.');
                        res.redirect('dashboard');
                        console.log('Request processed successfully');
                        return;
                    }, (err) => {
                        console.log('Something went wrong while pushing image reference to database.', err);
                        return;
                    });
                }, (err) => {
                    console.log('Something went wrong while finding user in database.', err);
                    return;
                });
            });
        }
    });
});

module.exports = router;