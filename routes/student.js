var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json(
        [
            {
                "id": 1,
                "name": "John",
                "age": 24
            },
            {
                "id": 2,
                "name": "Ann",
                "age": 26
            }
        ]
    );
});

module.exports = router;