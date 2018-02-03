const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const router = express.Router();

const User = require('../models/user');
const keys = require('../keys');

router.get('/', (req, res) => {
    const token = req.cookies.tk;
    jwt.verify(token, keys.secret, (err, result) => {
        if (err) {
            req.flash('login', 'enable');
            res.redirect('/login');
            return;
        } else {
            if (result.login !== 'render') {
                req.flash('login', 'enable');
                res.redirect('/login');
                return;
            } else if (result.login === 'render') {
                User.findById(result.user).then((dbResult) => {
                    if (dbResult.images.length === 0) {
                        console.log('Entered.');
                        res.render('dashboard', {
                            logout: 'enable',
                            noImages: 'No Images. Upload One!'
                        });
                        return;
                    }
                    res.render('dashboard', {
                        logout: 'enable',
                        images: dbResult.images
                    });
                    return;
                }, (err) => {
                    console.log('Something went wrong while finding user from db using id.');
                    return;
                });
            }
        }
    });
});

module.exports = router;