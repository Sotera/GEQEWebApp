var express = require('express');
var router = express.Router();
var login = require('./login');

/* GET home page. */
router.get('/', function (req, res) {
  if (!req.session.loopbackId) {
    // res.redirect('/login');
    res.render('login', { title: 'Login'});
  }else{
    res.render('index', {title: 'GEQE'});
  }
});

module.exports = router;
