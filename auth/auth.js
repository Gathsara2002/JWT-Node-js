const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {

    //check request has authorization  header and its include token
    if (req.headers.authorization && req.headers.authorization.startsWith('bearer')) {

        //get token
        const token = req.headers.authorization.split(' ')[1];
        if (token == null) {
            res.sendStatus(401)
        }

        //verify token
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user;
            next();
        });

    } else {
        res.sendStatus(401)
    }
}