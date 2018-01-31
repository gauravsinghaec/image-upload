const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const keys = require('../keys');

router.get('/', (req, res) => {
  const token = req.cookies.tk;
  jwt.verify(token, keys.secret, (err, result) => {
    if(err) {
      res.redirect('login');
    } else {
      const user = {
        user: result.user,
        login: 'redirect'
      };
      const newToken = jwt.sign(token, keys.secret);
      res.cookie('tk', newToken);
      res.redirect('/login');
    }
  });
});

router.post('/', (req, res) => {
  res.render('register');
});

module.exports = router;