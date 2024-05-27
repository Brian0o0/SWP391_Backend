require('dotenv').config();
let express = require('express');
let app = express();
let port = process.env.POST || 8081;
let hostname = process.env.HOST_NAME;
const webRouter = require('./routers/api');
const session = require('express-session');

app.use(express.json()) // for json

/*Dòng mã app.use(express.json()) trong ứng dụng Express có tác dụng thiết lập middleware để phân tích cú pháp (parse) các yêu cầu HTTP với payload JSON. 
Điều này có nghĩa là khi một yêu cầu HTTP chứa dữ liệu JSON trong phần thân (body) được gửi đến server,
 middleware này sẽ tự động phân tích cú pháp dữ liệu JSON đó và làm cho dữ liệu có thể truy cập được thông qua req.body. */


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));


app.use('/', webRouter);

app.listen(port);
console.log('RESTful API server started on: ' + port);



