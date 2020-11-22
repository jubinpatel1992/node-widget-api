var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var getcartRouter = require('./routes/getcart');
var setcartRouter = require('./routes/setcart');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/getcart', getcartRouter);
app.use('/setcart', setcartRouter);

module.exports = app;
