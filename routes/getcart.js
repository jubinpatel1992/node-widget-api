var express = require('express');
const redis = require("redis");

var router = express.Router();
const client = redis.createClient("redis://:p84cc8ca0b449dc4e202ac2abc282a8bdda43e894be2c735e2c751345c8e48560@ec2-54-147-54-250.compute-1.amazonaws.com:24419");

router.get('/', (req, res, next) => {
    if(req.query.cart) {
        client.get(req.query.cart, function(err, value) {
            if (err) {
                res.status(500).send('Server Error');
            } else {
                res.status(200).send(JSON.parse(value));
            }
        });    
    } else {
        res.status(200).send([]);
    }
});

module.exports = router;
