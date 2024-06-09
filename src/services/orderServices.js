//CRUD of order with database
const express = require('express');
const { pool } = require('../config/database');

const getAllSteps = async () => {
    try {
        await pool.connect();
        var sqlString = "select * from Step";
        const result = await pool.request().query(sqlString);
        const step = result.recordset;
        console.log(step);
        return step;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}
//get step by id from database function
const getStepByIds = async (stepId) => {
    try {
        await pool.connect();
        var sqlString = "select * from Step where StepID = @stepId;";
        const request = pool.request();
        request.input('stepId', stepId);
        const result = await request.query(sqlString);
        const step = result.recordset;
        console.log(step);
        return step;
    } catch (error) {
        console.log("Error:", error);
        return null;
    } finally {
        pool.close();
    }
}
//insert step to database function
const insertSteps = async (description, etimatedTime) => {
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO Step (Description, EtimatedTime) VALUES (@description, @etimatedTime)
        `;
        const request = pool.request();
        request.input('description', description);
        request.input('etimatedTime', etimatedTime);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        throw new Error("Error inserting step: " + error.message);
        return false;
    }
}
//update step on database function
const updateStepByIds = async (description, etimatedTime, stepId) => {
    try {
        await pool.connect();
        const sqlString = `
            UPDATE Step
            SET Description = @description, EtimatedTime = @etimatedTime
            WHERE StepID = @stepId
        `;
        const request = pool.request();
        request.input('description', description);
        request.input('etimatedTime', etimatedTime);
        request.input('stepId', stepId);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//delete step by id on database function
const deleteStepByIds = async (stepId) => {
    try {
        await pool.connect();
        const sqlString = `
        DELETE FROM Step WHERE StepID = @stepId
        `;
        const request = pool.request();
        request.input('stepId', stepId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
const getAllOrderProgresss = async () => {
    try {
        await pool.connect();
        var sqlString = "select * from OrderProgress";
        const result = await pool.request().query(sqlString);
        const orderProgress = result.recordset;
        console.log(orderProgress);
        return orderProgress;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}
//get orderProgress by id from database function
const getOrderProgressByIds = async (orderProgressId) => {
    try {
        await pool.connect();
        var sqlString = "select * from OrderProgress where OrderProgressID = @orderProgressId";
        const request = pool.request();
        request.input('orderProgressId', orderProgressId);
        const result = await request.query(sqlString);
        const orderProgress = result.recordset;
        console.log(orderProgress);
        return orderProgress;
    } catch (error) {
        console.log("Error:", error);
        return null;
    } finally {
        pool.close();
    }
}
//insert orderProgressId to database function
const insertOrderProgresss = async (img, note, stepId, orderId, date) => {
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO OrderProgress (Img, Note, StepID, OrderID, Date) VALUES (@img, @note, @stepId, @orderId, @date)
        `;
        const request = pool.request();
        request.input('img', img);
        request.input('note', note);
        request.input('stepId', stepId);
        request.input('orderId', orderId);
        request.input('date', date);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        throw new Error("Error inserting orderProgress: " + error.message);
        return false;
    }
}
//update orderProgressId on database function
const updateOrderProgressByIds = async (img, note, stepId, orderId, date, orderProgressId) => {
    try {
        await pool.connect();
        const sqlString = `
            UPDATE OrderProgress
            SET Img=@img, Note=@note, StepID=@stepId, OrderID=@orderId, Date= @date
            WHERE OrderProgressID = @orderProgressId
        `;
        const request = pool.request();
        request.input('img', img);
        request.input('note', note);
        request.input('stepId', stepId);
        request.input('orderId', orderId);
        request.input('date', date);
        request.input('orderProgressId', orderProgressId);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//delete orderProgressId by id on database function
const deleteOrderProgressByIds = async (orderProgressId) => {
    try {
        await pool.connect();
        const sqlString = `
        DELETE FROM OrderProgress WHERE OrderProgressId = @orderProgressId
        `;
        const request = pool.request();
        request.input('orderProgressId', orderProgressId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//get all order from databases
const getAllOrders = async () => {
    try {
        await pool.connect();
        var sqlString = "select * from [Order]";
        const result = await pool.request().query(sqlString);
        const order = result.recordset;
        console.log(order);
        return order;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}
//get order by id from database function
const getOrderByIds = async (orderId) => {
    try {
        await pool.connect();
        var sqlString = "select * from [Order] where OrderID = @orderId";
        const request = pool.request();
        request.input('orderId', orderId);
        const result = await request.query(sqlString);
        const order = result.recordset;
        console.log(order);
        return order;
    } catch (error) {
        console.log("Error:", error);
        return null;
    } finally {
        pool.close();
    }
}
//insert order to database function
const insertOrders = async (paymentMethods, phone, address, orderDetailId, status, userId, description, userName) => {
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO [Order] (PaymentMethods, Phone, Address, OrderDetailId, Status, UserId, Description, UserName) VALUES (@paymentMethods, @phone, @address, @orderDetailId, @status, @userId, @description, @userName)
        `;
        const request = pool.request();
        request.input('paymentMethods', paymentMethods);
        request.input('phone', phone);
        request.input('address', address);
        request.input('orderDetailId', orderDetailId);
        request.input('status', status);
        request.input('userId', userId);
        request.input('description', description);
        request.input('userName', userName);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        throw new Error("Error inserting order: " + error.message);
        return false;
    }
}
//update order on database function
const updateOrderByIds = async (paymentMethods, phone, address, orderDetailId, status, userId, description, userName, orderId) => {
    try {
        await pool.connect();
        const sqlString = `
            UPDATE [Order]
            SET PaymentMethods = @paymentMethods, Phone = @phone, Address = @address, OrderDetailId = @orderDetailId, Status = @status, UserId = @userId, Description = @description, UserName = @userName
            WHERE OrderID = @orderId
        `;
        const request = pool.request();
        request.input('paymentMethods', paymentMethods);
        request.input('phone', phone);
        request.input('address', address);
        request.input('orderDetailId', orderDetailId);
        request.input('status', status);
        request.input('userId', userId);
        request.input('description', description);
        request.input('userName', userName);
        request.input('orderId', orderId);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//delete order by id on database function
const deleteOrderByIds = async (orderId) => {
    try {
        await pool.connect();
        const sqlString = `
        DELETE FROM [Order] WHERE OrderID = @orderId
        `;
        const request = pool.request();
        request.input('orderId', orderId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//get all Order Detail from databases
const getAllOrderDetails = async () => {
    try {
        await pool.connect();
        var sqlString = "select * from OrderDetail";
        const result = await pool.request().query(sqlString);
        const orderDetail = result.recordset;
        console.log(orderDetail);
        return orderDetail;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}
//get OrderDetail by id from database function
const getOrderDetailByIds = async (orderDetailId) => {
    try {
        await pool.connect();
        var sqlString = "select * from OrderDetail where OrderDetailID = @orderDetailId";
        const request = pool.request();
        request.input('orderDetailId', orderDetailId);
        const result = await request.query(sqlString);
        const orderDetail = result.recordset;
        console.log(orderDetail);
        return orderDetail;
    } catch (error) {
        console.log("Error:", error);
        return null;
    } finally {
        pool.close();
    }
}
//insert OrderDetail to database function
const insertOrderDetails = async (description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate, orderId) => {
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO OrderDetail (Description, ProductID, Status, ProductName, CategoryID, CategoryName, MaterialID, MaterialName, GemID, GemName, QuantityGem, QuantityMaterial, OrderDate, OrderID) VALUES (@description, @productId, @status, @productName, @categoryId, @categoryName, @materialId, @materialName, @gemId, @gemName, @quantityGem, @quantityMaterial, @orderDate, @orderId)
        `;
        const request = pool.request();
        request.input('description', description);
        request.input('productId', productId);
        request.input('status', status);
        request.input('productName', productName);
        request.input('categoryId', categoryId);
        request.input('categoryName', categoryName);
        request.input('materialId', materialId);
        request.input('materialName', materialName);
        request.input('gemId', gemId);
        request.input('gemName', gemName);
        request.input('quantityGem', quantityGem);
        request.input('quantityMaterial', quantityMaterial);
        request.input('orderDate', orderDate);
        request.input('orderId', orderId);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        throw new Error("Error inserting order detail: " + error.message);
        return false;
    }
}
//update OrderDetail on database function
const updateOrderDetailByIds = async (description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate, orderId, orderDetailId) => {
    try {
        await pool.connect();
        const sqlString = `
            UPDATE OrderDetail
            SET Description = @description, ProductID = @productId, Status = @status, ProductName = @productName,
                CategoryID = @categoryId, CategoryName = @categoryName,MaterialID = @materialId, MaterialName = @materialName, 
                GemID = @gemId , GemName = @gemName,QuantityGem = @quantityGem, QuantityMaterial = @quantityMaterial , OrderDate = @orderDate, OrderID = @orderId
            WHERE OrderDetailID = @orderDetailId
        `;
        const request = pool.request();
        request.input('description', description);
        request.input('productId', productId);
        request.input('status', status);
        request.input('productName', productName);
        request.input('categoryId', categoryId);
        request.input('categoryName', categoryName);
        request.input('materialId', materialId);
        request.input('materialName', materialName);
        request.input('gemId', gemId);
        request.input('gemName', gemName);
        request.input('quantityGem', quantityGem);
        request.input('quantityMaterial', quantityMaterial);
        request.input('orderDate', orderDate);
        request.input('orderId', orderId);
        request.input('orderDetailId', orderDetailId);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//delete OrderDetail by id on database function
const deleteOrderDetailByIds = async (orderDetailId) => {
    try {
        await pool.connect();
        const sqlString = `
        DELETE FROM OrderDetail WHERE OrderDetailID = @orderDetailId
        `;
        const request = pool.request();
        request.input('orderDetailId', orderDetailId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}




module.exports = {
    getAllSteps,
    getStepByIds,
    insertSteps,
    updateStepByIds,
    deleteStepByIds,
    getAllOrderProgresss,
    getOrderProgressByIds,
    insertOrderProgresss,
    deleteOrderProgressByIds,
    updateOrderProgressByIds,
    getAllOrders,
    getOrderByIds,
    insertOrders,
    updateOrderByIds,
    deleteOrderByIds,
    getAllOrderDetails,
    getOrderDetailByIds,
    insertOrderDetails,
    updateOrderDetailByIds,
    deleteOrderDetailByIds,

}