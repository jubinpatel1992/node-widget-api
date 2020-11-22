var express = require('express');
const Shopify = require('shopify-api-node');
const redis = require("redis");

const client = redis.createClient("redis://:p84cc8ca0b449dc4e202ac2abc282a8bdda43e894be2c735e2c751345c8e48560@ec2-54-147-54-250.compute-1.amazonaws.com:24419");

const shopify = new Shopify({
  shopName: 'jubinpatel5',
  apiKey: '0020de82a4438bdeef9119efe37f9afb',
  password: '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'
});

var router = express.Router();

router.post('/', async (req, res, next) => {
    const cartDetails = await req.body;
    
    if(cartDetails && cartDetails.line_items && cartDetails.line_items.length > 0) {
        const data = [];

        await Promise.all(cartDetails.line_items.map(async (items) => {
            const productDetails = await shopify.product.get(items.product_id);
            data.push({
                title: productDetails.title,
                price: productDetails.variants[0].price,
                image: productDetails.images[0].src
            });
        }));        
        
        client.set(cartDetails.id, JSON.stringify(data));
    } else {
        if(client.get(cartDetails.id)) {
            client.del(cartDetails.id);
        }
    }

    res.status(200).send('success');
});

module.exports = router;
