const express = require('express');
const validator = require('validator');
const router = express.Router();

const mongoose = require('../db/mongoose');
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('register', {
        login: 'enable'
    });
});

router.post('/', (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;
    var errors = false;

    var checkUser = validator.isLength(username, { min: 3, max: undefined });
    var checkEmailEmpty = validator.isEmpty(email);
    var checkEmail = validator.isEmail(email);
    var checkPassEmpty = validator.isEmpty(pass1);
    var checkPassPattern = true;
    console.log(checkPassPattern);
    if (!checkUser) {
        if (validator.isEmpty(username)) {
            res.render('register', {
                error: 'Username is required',
                login: 'enable'                
            });
        } else {
            res.render('register', {
                error: 'Username should be atleast 3 characters long.',
                login: 'enable'
            });
        }
        errors = true;
    } else if (checkEmailEmpty) {
        res.render('register', {
            error: 'Email is required.',
            login: 'enable'
        });
        errors = true;
    } else if (!checkEmail) {
        res.render('register', {
            error: 'Email is not valid.',
            login: 'enable'
        });
        errors = true;
    } else if (checkPassEmpty) {
        res.render('register', {
            error: 'Password is required',
            login: 'enable'
        });
        errors = true;
    } else if (!validator.equals(pass1, pass2)) {
        res.render('register', {
            error: 'Both passwords should match.',
            login: 'enable'
        });
        errors = true;
    } else if (!checkPassPattern) {
        res.render('register', {
            error: 'Password should atleast be 4 characters long and should contain: one uppercase and lowercase character and one numeric digit.',
            login: 'enable'
        });
        errors = true;
    }

    if (!errors) {
        var newUser = new User({ username, email, password: pass1 });
        User.createUser(newUser, (err, data) => {
            if (err) {
                console.log('Error', err);
                res.render('register', {
                    login: 'enable'                    
                });
                return;
            }
            console.log('Saved from register file', data);
            req.flash('login', 'enable');
            req.flash('message', 'You can now login account added.');
            res.redirect('/login');
        });
    }
});

module.exports = router;