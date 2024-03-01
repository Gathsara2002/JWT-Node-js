var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
    res.send("user login");
});

module.exports = router;
