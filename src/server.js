require('dotenv').config();
let express = require('express');
let app = express();
let port = process.env.PORT || 8082;
let hostname = process.env.HOST_NAME;
const webRouter = require('./routers/api');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('../src/controllers/passPort');
const cookieSession = require('cookie-session');
const key = require('../config/key')
app.use(express.json()) // for json

app.use(cookieParser());
/*Dòng mã app.use(express.json()) trong ứng dụng Express có tác dụng thiết lập middleware để phân tích cú pháp (parse) các yêu cầu HTTP với payload JSON. 
Điều này có nghĩa là khi một yêu cầu HTTP chứa dữ liệu JSON trong phần thân (body) được gửi đến server,
 middleware này sẽ tự động phân tích cú pháp dữ liệu JSON đó và làm cho dữ liệu có thể truy cập được thông qua req.body. */
app.use(express.urlencoded({ extended: false }));


// CORS middleware
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());


app.use('/', webRouter);

app.listen(port);
console.log('RESTful API server started on: ' + port);



