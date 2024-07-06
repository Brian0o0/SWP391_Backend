//The api sent to the frontend
require('dotenv').config();
let $ = require("jquery");
const request = require("request");
const moment = require("moment");
const { pool } = require('../config/database');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const router = express.Router();


const { register, login, logout, getAllUser, getUserById, getUserByUserName, deleteUserById, updateUserById, getUserByName, insertUserOnGoogle, getTotalUser } = require('../controllers/userController');
const { getAllProduct, getProductById, insertProduct, updateProductById, deleteProductById, getProductByNameOrId, getProductByCategory } = require('../controllers/productController');
const { getAllCostGem, getCostGemById, insertCostGem, deleteCostGemById, updateCostGemById, getAllGem, getGemById, insertGem, updateGemById, deleteGemById, getGemByPrice } = require('../controllers/gemController');
const { getAllCostMaterial, getCostMaterialById, insertCostMaterial, deleteCostMaterialById, updateCostMaterialById, getAllMaterial, getMaterialById, insertMaterial, updateMaterialById, deleteMaterialById } = require('../controllers/materialController');
const { getAllStep, getStepById, insertStep, deleteStepById, updateStepById, getAllOrderProgress, getOrderProgressById, insertOrderProgress, deleteOrderProgressById, updateOrderProgressById, getAllOrder, getOrderById, insertOrder, deleteOrderById, updateOrderById,
    getAllOrderDetail, insertOrderDetailTemp, getOrderDetailById, insertOrderDetail, updateOrderDetailById, deleteOrderDetailById, getTotalOrder, getTotalOrderDetailByMonth,
    getTotalOrderDetail, getTotalAmountOrderDetail, getTotalAmountOrderDetailByMonth } = require('../controllers/orderController');
const { getAllCategory, getCategoryById, insertCategory, updateCategoryById, deleteCategoryById } = require("../controllers/categoryController");
const { getAllBlog, getBlogById, insertBlog, updateBlogById, deleteBlogById } = require('../controllers/bolgController');
const { loginSuccess } = require('../controllers/authController')
const { payment } = require('../controllers/zaloPay')
const { updateOrderStatus } = require('../services/orderServices')

//api prodcuct
router.get('/test/getAllProduct', getAllProduct);
router.get('/test/getProductById', getProductById);
router.get('/test/getProductByNameOrId', getProductByNameOrId);
router.get('/test/getProductByCategory', getProductByCategory);
router.post('/test/insertProduct', insertProduct);
router.put('/test/updateProductById', updateProductById);
router.delete('/test/deleteProductById', deleteProductById);

//api user
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'], session: false
})
);
router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
        req.user = profile;
        next()
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/login-success/${req.user.UserId}`)
});

router.post('/login-success', loginSuccess)

router.post("/test/payment", payment);

router.get('/test/getAllUser', getAllUser);
router.get('/test/getTotalUser', getTotalUser);
router.get('/test/getUserById', getUserById);
router.get('/test/getUserByUserName', getUserByUserName);
router.get('/test/getUserByName', getUserByName);
router.put('/test/updateUserById', updateUserById);
router.delete('/test/deleteUserById', deleteUserById);
// router.post('/test/insert', insertUser);
router.post('/test/register', register)
// router.post('/test/insertUserOnGoogle', insertUserOnGoogle)
router.post('/test/login', login);
router.post('/test/logout', logout);
//api cost gem
router.get('/test/getAllCostGem', getAllCostGem);
router.get('/test/getCostGemById', getCostGemById);
router.post('/test/insertCostGem', insertCostGem);
router.delete('/test/deleteCostGemById', deleteCostGemById);
router.put('/test/updateCostGemById', updateCostGemById);

//api gem
router.get('/test/getAllGem', getAllGem);
router.get('/test/getGemById', getGemById);
router.post('/test/insertGem', insertGem);
router.put('/test/updateGemById', updateGemById);
router.delete('/test/deleteGemById', deleteGemById);
router.post('/test/getGemByPrice', getGemByPrice);
//api cost material
router.get('/test/getAllCostMaterial', getAllCostMaterial);
router.get('/test/getCostMaterialById', getCostMaterialById);
router.post('/test/insertCostMaterial', insertCostMaterial);
router.put('/test/updateCostMaterialById', updateCostMaterialById);
router.delete('/test/deleteCostMaterialById', deleteCostMaterialById);

//api material
router.get('/test/getAllMaterial', getAllMaterial);
router.get('/test/getMaterialById', getMaterialById);
router.post('/test/insertMaterial', insertMaterial);
router.put('/test/updateMaterialById', updateMaterialById);
router.delete('/test/deleteMaterialById', deleteMaterialById);

//api step
router.get('/test/getAllStep', getAllStep);
router.get('/test/getStepById', getStepById);
router.post('/test/insertStep', insertStep);
router.put('/test/updateStepById', updateStepById);
router.delete('/test/deleteStepById', deleteStepById);

//api order progress 
router.get('/test/getAllOrderProgress', getAllOrderProgress);
router.get('/test/getOrderProgressById', getOrderProgressById);
router.post('/test/insertOrderProgress', insertOrderProgress);
router.put('/test/updateOrderProgressById', updateOrderProgressById);
router.delete('/test/deleteOrderProgressById', deleteOrderProgressById);

//api order 
router.get('/test/getAllOrder', getAllOrder);
router.get('/test/getOrderById', getOrderById);
router.get('/test/getTotalOrder', getTotalOrder);
router.post('/test/insertOrder', insertOrder);
router.put('/test/updateOrderById', updateOrderById);
router.delete('/test/deleteOrderById', deleteOrderById);

//api order detail progress
router.get('/test/getAllOrderDetail', getAllOrderDetail);
router.get('/test/getOrderDetailById', getOrderDetailById);
router.get('/test/getTotalOrderDetailByMonth', getTotalOrderDetailByMonth);
router.get('/test/getTotalOrderDetail', getTotalOrderDetail);
router.get('/test/getTotalAmountOrderDetail', getTotalAmountOrderDetail);
router.get('/test/getTotalAmountOrderDetailByMonth', getTotalAmountOrderDetailByMonth);
router.post('/test/insertOrderDetailTemp', insertOrderDetailTemp);
router.post('/test/insertOrderDetail', insertOrderDetail);
router.put('/test/updateOrderDetailById', updateOrderDetailById);
router.delete('/test/deleteOrderDetailById', deleteOrderDetailById);


//api category
router.get('/test/getAllCategory', getAllCategory);
router.get('/test/getCategoryById', getCategoryById);
router.post('/test/insertCategory', insertCategory);
router.delete('/test/deleteCategoryById', deleteCategoryById);
router.put('/test/updateCategoryById', updateCategoryById);

//api blog
router.get('/test/getAllBlogs', getAllBlog);
router.get('/test/getBlogById', getBlogById);
router.post('/test/insertBlog', insertBlog);
router.put('/test/updateBlogById', updateBlogById);
router.delete('/test/deleteBlogById', deleteBlogById);


router.get("/", function (req, res, next) {
    res.render("orderlist", { title: "Danh sách đơn hàng" });
});

router.get("/create_payment_url", function (req, res, next) {
    res.render("order", { title: "Tạo mới đơn hàng", amount: 10000 });
});

router.get("/querydr", function (req, res, next) {
    let desc = "truy van ket qua thanh toan";
    res.render("querydr", { title: "Truy vấn kết quả thanh toán" });
});

router.get("/refund", function (req, res, next) {
    let desc = "Hoan tien GD thanh toan";
    res.render("refund", { title: "Hoàn tiền giao dịch thanh toán" });
});

//Route POST tạo URL thanh toán
router.post("/create_payment_url", function (req, res, next) {
    process.env.TZ = "Asia/Ho_Chi_Minh";

    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");

    let ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let config = require("config");

    let tmnCode = config.get("vnp_TmnCode");
    let secretKey = config.get("vnp_HashSecret");
    let vnpUrl = config.get("vnp_Url");
    let returnUrl = config.get("vnp_ReturnUrl");
    let orderId = req.body.orderId;
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;

    let locale = req.body.language;
    if (locale === null || locale === "") {
        locale = "vn";
    }
    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
    vnp_Params["vnp_OrderType"] = "250000";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    // if (bankCode !== null && bankCode !== "") {
    //     vnp_Params["vnp_BankCode"] = bankCode;
    // }

    vnp_Params = sortObject(vnp_Params);
    console.log(vnp_Params);
    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
    console.log(signed)
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    res.redirect(vnpUrl)
    // res.set("Content-Type", "text/html");
    // res.send(JSON.stringify(vnpUrl));
    console.log(JSON.stringify(vnpUrl))
});

//Route GET xử lý kết quả thanh toán trả về từ VNPAY
router.get("/vnpay_return", async function (req, res, next) {
    let vnp_Params = req.query;
    console.log("ss");
    console.log(vnp_Params);

    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    let config = require("config");
    let tmnCode = config.get("vnp_TmnCode");
    let secretKey = config.get("vnp_HashSecret");

    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
        const orderId = req.query.vnp_TxnRef;
        let updateResult = await updateOrderStatus("banked", orderId);
        console.log("sss12")
        if (updateResult) {
            // res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
            console.log(vnp_Params["vnp_ResponseCode"])
        } else {
            // res.render("success", { code: "97" });
            console.log("s97")
        }
    } else {
        // res.render("success", { code: "97" });
        console.log("97")
    }
});

//Route GET xử lý IPN từ VNPAY
router.get("/vnpay_ipn", function (req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params["vnp_SecureHash"];
    console.log("sdsds")
    let orderId = vnp_Params["vnp_TxnRef"];
    let rspCode = vnp_Params["vnp_ResponseCode"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    let config = require("config");
    let secretKey = config.get("vnp_HashSecret");
    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

    let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

    let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if (secureHash === signed) {
        //kiểm tra checksum
        if (checkOrderId) {
            if (checkAmount) {
                if (paymentStatus == "0") {
                    //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                    if (rspCode == "00") {
                        //thanh cong
                        //paymentStatus = '1'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                        res.status(200).json({ RspCode: "00", Message: "Success" });
                    } else {
                        //that bai
                        //paymentStatus = '2'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                        res.status(200).json({ RspCode: "00", Message: "Success" });
                    }
                } else {
                    res.status(200).json({
                        RspCode: "02",
                        Message: "This order has been updated to the payment status",
                    });
                }
            } else {
                res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
            }
        } else {
            res.status(200).json({ RspCode: "01", Message: "Order not found" });
        }
    } else {
        res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
    }
});

//Router này được sử dụng để truy vấn trạng thái giao dịch từ VNPAY.
router.post("/querydr", function (req, res, next) {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    let date = new Date();

    let config = require("config");
    let crypto = require("crypto");

    let vnp_TmnCode = config.get("vnp_TmnCode");
    let secretKey = config.get("vnp_HashSecret");
    let vnp_Api = config.get("vnp_Api");

    let vnp_TxnRef = req.body.orderId;
    let vnp_TransactionDate = req.body.transDate;

    let vnp_RequestId = moment(date).format("HHmmss");
    let vnp_Version = "2.1.0";
    let vnp_Command = "querydr";
    let vnp_OrderInfo = "Truy van GD ma:" + vnp_TxnRef;

    let vnp_IpAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let currCode = "VND";
    let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

    let data =
        vnp_RequestId +
        "|" +
        vnp_Version +
        "|" +
        vnp_Command +
        "|" +
        vnp_TmnCode +
        "|" +
        vnp_TxnRef +
        "|" +
        vnp_TransactionDate +
        "|" +
        vnp_CreateDate +
        "|" +
        vnp_IpAddr +
        "|" +
        vnp_OrderInfo;

    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(new Buffer(data, "utf-8")).digest("hex");

    let dataObj = {
        vnp_RequestId: vnp_RequestId,
        vnp_Version: vnp_Version,
        vnp_Command: vnp_Command,
        vnp_TmnCode: vnp_TmnCode,
        vnp_TxnRef: vnp_TxnRef,
        vnp_OrderInfo: vnp_OrderInfo,
        vnp_TransactionDate: vnp_TransactionDate,
        vnp_CreateDate: vnp_CreateDate,
        vnp_IpAddr: vnp_IpAddr,
        vnp_SecureHash: vnp_SecureHash,
    };
    // /merchant_webapi/api/transaction
    request(
        {
            url: vnp_Api,
            method: "POST",
            json: true,
            body: dataObj,
        },
        function (error, response, body) {
            console.log(response);
        }
    );
});

//Router này được sử dụng để hoàn tiền cho giao dịch qua VNPAY.
router.post("/refund", function (req, res, next) {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    let date = new Date();

    let config = require("config");
    let crypto = require("crypto");

    let vnp_TmnCode = config.get("vnp_TmnCode");
    let secretKey = config.get("vnp_HashSecret");
    let vnp_Api = config.get("vnp_Api");

    let vnp_TxnRef = req.body.orderId;
    let vnp_TransactionDate = req.body.transDate;
    let vnp_Amount = req.body.amount * 100;
    let vnp_TransactionType = req.body.transType;
    let vnp_CreateBy = req.body.user;

    let currCode = "VND";

    let vnp_RequestId = moment(date).format("HHmmss");
    let vnp_Version = "2.1.0";
    let vnp_Command = "refund";
    let vnp_OrderInfo = "Hoan tien GD ma:" + vnp_TxnRef;

    let vnp_IpAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

    let vnp_TransactionNo = "0";

    let data =
        vnp_RequestId +
        "|" +
        vnp_Version +
        "|" +
        vnp_Command +
        "|" +
        vnp_TmnCode +
        "|" +
        vnp_TransactionType +
        "|" +
        vnp_TxnRef +
        "|" +
        vnp_Amount +
        "|" +
        vnp_TransactionNo +
        "|" +
        vnp_TransactionDate +
        "|" +
        vnp_CreateBy +
        "|" +
        vnp_CreateDate +
        "|" +
        vnp_IpAddr +
        "|" +
        vnp_OrderInfo;
    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(new Buffer(data, "utf-8")).digest("hex");

    let dataObj = {
        vnp_RequestId: vnp_RequestId,
        vnp_Version: vnp_Version,
        vnp_Command: vnp_Command,
        vnp_TmnCode: vnp_TmnCode,
        vnp_TransactionType: vnp_TransactionType,
        vnp_TxnRef: vnp_TxnRef,
        vnp_Amount: vnp_Amount,
        vnp_TransactionNo: vnp_TransactionNo,
        vnp_CreateBy: vnp_CreateBy,
        vnp_OrderInfo: vnp_OrderInfo,
        vnp_TransactionDate: vnp_TransactionDate,
        vnp_CreateDate: vnp_CreateDate,
        vnp_IpAddr: vnp_IpAddr,
        vnp_SecureHash: vnp_SecureHash,
    };

    request(
        {
            url: vnp_Api,
            method: "POST",
            json: true,
            body: dataObj,
        },
        function (error, response, body) {
            console.log(response);
        }
    );
});

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}



module.exports = router;