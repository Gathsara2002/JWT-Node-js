var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
let env = require('dotenv').config();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//store refresh token
let refreshToken = [];

router.post('/login', (req, res, next) => {

    //get data from req
    const username = req.body.username;
    //create payload
    const user = {name: username};
    //create token
    const accessToken = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: `20s`});
    //create refresh token
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_KEY, {expiresIn: `24h`});
    refreshToken.push(refreshToken);
    res.send({accessToken, refreshToken});

});

module.exports = router;
