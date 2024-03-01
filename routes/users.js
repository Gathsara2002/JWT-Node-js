var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
let env = require('dotenv').config();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {

    //get data from req
    const username = req.body.username;
    //create payload
    const user = {name: username};
    //create token
    const token = jwt.sign(user, process.env.SECRET_KEY,{expiresIn: `20s`});
    res.send({token});

});

module.exports = router;
