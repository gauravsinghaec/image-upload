const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoose = require('../db/mongoose');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {
        login: 'enable'
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email }).then((data) => {
        if (data === null) {
            res.render('login', {
                error: 'Seems like email does not exist.',
                login: 'enable'
            });
            return;
        }
        bcrypt.compare(req.body.pass, data.password, (err, result) => {
            if (err) {
                console.log('Something went wrong while comapring passwords.', err);
            } else if (!result) {
                res.render('login', {
                    error: 'Wrong Password',
                    login: 'enable'
                });
                return;
            } else if (result) {
                const secret = 'This is some secret that noone knows.';
                const user = {
                    user: data.id,
                    login: 'render'
                }
                const token = jwt.sign(user, secret);
                res.cookie('tk', token);
                req.flash('logout', 'enable');
                res.redirect('/dashboard');
            }
        });
    }, (err) => {
        console.log('Some error occured while retrieving user data from database.', err);
    });
});

module.exports = router;