var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
let env = require('dotenv').config();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//store refresh token
let refreshTokens = [];

router.post('/login', (req, res, next) => {

    //get data from req
    const username = req.body.username;
    //create payload
    const user = {name: username};
    //create token
    const accessToken = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: `20s`});
    //create refresh token
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_KEY, {expiresIn: `24h`});
    refreshTokens.push(refreshToken);
    res.send({accessToken, refreshToken});

});

router.post('/token', (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) {
        res.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
        res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.RE_TOKEN_KEY, (err, user) => {
        if (err) {
            res.sendStatus(403);
        }
        const accessToken = jwt.sign({name: user.name}, process.env.SECRET_KEY, {expiresIn: '20s'});
        res.send({accessToken});
    });
});

router.delete('/logout', (req, res) => {
    const refreshToken = req.body.refreshToken;
    refreshTokens = refreshTokens.filter(t => t !== refreshToken);
    res.sendStatus(204);
});

module.exports = router;
