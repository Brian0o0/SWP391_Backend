//CRUD of order with database
const express = require('express');
const { pool } = require('../config/database');
const { getDayNow, getGemByIds } = require('../services/gemServices')
const { getProductByIds } = require('../services/productServices')
const { getMaterialByIds } = require('../services/materialServices')
const { getCategoryByIds } = require('../services/categoryServices');
const { get } = require('request');
const { connectToDatabase } = require('../config/database');

const getAllSteps = async () => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from Step";
        const result = await request.query(sqlString);
        const step = result.recordset;
        console.log(step);
        return step;
    } catch (error) {
        console.log(error);
        return null;
    }
}
//get step by id from database function
const getStepByIds = async (stepId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from Step where StepId = @stepId;";
        request.input('stepId', stepId);
        const result = await request.query(sqlString);
        const step = result.recordset;
        console.log(step);
        return step;
    } catch (error) {
        console.log("Error:", error);
        return null;
    }
}
//insert step to database function
const insertSteps = async (description, etimatedTime) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
        INSERT INTO Step (Description, EtimatedTime) VALUES (@description, @etimatedTime)
        `;
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
        if (getStepByIds(stepId)) {
            const pool = await connectToDatabase();
            const request = pool.request();;
            const sqlString = `
            UPDATE Step
            SET Description = @description, EtimatedTime = @etimatedTime
            WHERE StepId = @stepId
        `;
            request.input('description', description);
            request.input('etimatedTime', etimatedTime);
            request.input('stepId', stepId);
            // Thực hiện truy vấn
            await request.query(sqlString);
            // Gửi phản hồi
            return true;
        } else {
            console.log('Step is invalid');
            return false;
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//delete step by id on database function
const deleteStepByIds = async (stepId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
        DELETE FROM Step WHERE StepId = @stepId
        `;
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
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from OrderProgress";
        const result = await request.query(sqlString);
        const orderProgresss = result.recordset;
        let orderProgresList = [];
        for (const orderProgress of orderProgresss) {
            if (orderProgress.Image) {
                try {
                    orderProgress.Image = JSON.parse(orderProgress.Image);
                } catch (error) {
                    console.error(`Error parsing Image JSON for gem ID ${orderProgress.orderProgressId}:`, error);
                }
            }
            orderProgresList.push(orderProgress);
        }
        console.log(orderProgresList);
        return orderProgresList;
    } catch (error) {
        console.log(error);
        return null;
    }
}
//get orderProgress by id from database function
const getOrderProgressByIds = async (orderProgressId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from OrderProgress where OrderProgressId = @orderProgressId";
        request.input('orderProgressId', orderProgressId);
        const result = await request.query(sqlString);
        const orderProgress = result.recordset;
        if (orderProgress.Image) {
            try {
                orderProgress.Image = JSON.parse(orderProgress.Image);
            } catch (error) {
                console.error(`Error parsing Image JSON for gem ID ${orderProgress.orderProgressId}:`, error);
            }
        }
        console.log(orderProgress);
        return orderProgress;
    } catch (error) {
        console.log("Error:", error);
        return null;
    }
}
//insert orderProgressId to database function
const insertOrderProgresss = async (image, note, stepId, orderId, date) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const imgTemp = JSON.stringify(image);
        const sqlString = `
        INSERT INTO OrderProgress (Image, Note, StepId, OrderId, Date) VALUES (@image, @note, @stepId, @orderId, @date)
        `;
        request.input('image', imgTemp);
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
const updateOrderProgressByIds = async (image, note, stepId, orderId, date, orderProgressId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const imgTemp = JSON.stringify(image);
        const sqlString = `
            UPDATE OrderProgress
            SET Image=@image, Note=@note, StepId=@stepId, OrderId=@orderId, Date= @date
            WHERE OrderProgressId = @orderProgressId
        `;
        request.input('image', imgTemp);
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
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
        DELETE FROM OrderProgress WHERE OrderProgressId = @orderProgressId
        `;
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
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from [Order]";
        const result = await request.query(sqlString);
        const order = result.recordset;
        console.log(order);
        return order;
    } catch (error) {
        console.log(error);
        return null;
    }
}
//get order by id from database function
const getOrderByIds = async (orderId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from [Order] where OrderId = @orderId";
        request.input('orderId', orderId);
        const result = await request.query(sqlString);
        const order = result.recordset;
        console.log(order);
        return order;
    } catch (error) {
        console.log("Error:", error);
        return null;
    }
}
//insert order to database function
const insertOrders = async (paymentMethods, phone, address, status, userId, description, userName) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
        INSERT INTO [Order] (PaymentMethods, Phone, Address, Status, UserId, Description, UserName) VALUES (@paymentMethods, @phone, @address, @status, @userId, @description, @userName)
        `;
        request.input('paymentMethods', paymentMethods);
        request.input('phone', phone);
        request.input('address', address);
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
const updateOrderByIds = async (paymentMethods, phone, address, status, userId, description, userName, orderId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
            UPDATE [Order]
            SET PaymentMethods = @paymentMethods, Phone = @phone, Address = @address, Status = @status, UserId = @userId, Description = @description, UserName = @userName
            WHERE OrderID = @orderId
        `;
        request.input('paymentMethods', paymentMethods);
        request.input('phone', phone);
        request.input('address', address);
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
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
        DELETE FROM [Order] WHERE OrderId = @orderId
        `;
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
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from OrderDetail";
        const result = await request.query(sqlString);
        const orderDetail = result.recordset;
        console.log(orderDetail);
        return orderDetail;
    } catch (error) {
        console.log(error);
        return null;
    }
}
//get OrderDetail by id from database function
const getOrderDetailByIds = async (orderDetailId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from OrderDetail where OrderDetailId = @orderDetailId";
        request.input('orderDetailId', orderDetailId);
        const result = await request.query(sqlString);
        const orderDetail = result.recordset;
        console.log(orderDetail);
        return orderDetail;
    } catch (error) {
        console.log("Error:", error);
        return null;
    }
}
//insert OrderDetail to database function
const insertOrderDetails = async (description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate, orderId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
        INSERT INTO OrderDetail (Description, ProductID, Status, ProductName, CategoryID, CategoryName, MaterialID, MaterialName, GemID, GemName, QuantityGem, QuantityMaterial, OrderDate, OrderId) VALUES (@description, @productId, @status, @productName, @categoryId, @categoryName, @materialId, @materialName, @gemId, @gemName, @quantityGem, @quantityMaterial, @orderDate, @orderId)
        `;
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
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
            UPDATE OrderDetail
            SET Description = @description, ProductId = @productId, Status = @status, ProductName = @productName,
                CategoryId = @categoryId, CategoryName = @categoryName,MaterialId = @materialId, MaterialName = @materialName, 
                GemId = @gemId , GemName = @gemName,QuantityGem = @quantityGem, QuantityMaterial = @quantityMaterial , OrderDate = @orderDate, OrderId = @orderId
            WHERE OrderDetailId = @orderDetailId
        `;
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
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
        DELETE FROM OrderDetail WHERE OrderDetailId = @orderDetailId
        `;
        request.input('orderDetailId', orderDetailId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const updateOrderStatus = async (status, orderId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = "UPDATE [Order] SET Status = @status WHERE OrderId = @orderId";
        request.input('status', status);
        request.input('orderId', orderId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

const insertOrderDetailServices = async (description, productId, status, orderId) => {
    try {
        const product = await getProductByIds(productId);
        const gem = await getGemByIds(product[0].GemID);
        const material = await getMaterialByIds(product[0].MaterialID);
        const category = await getCategoryByIds(product[0].CategoryID);
        const check = await insertOrderDetails(
            description,
            productId,
            status,
            product[0].Name,
            product[0].CategoryID,
            category[0].Name,
            product[0].MaterialID,
            material[0].Name,
            product[0].GemID,
            gem[0].Name,
            product[0].QuantityGem,
            product[0].QuantityMaterial,
            getDayNow(),
            orderId
        )
        if (check) {
            return true;
        } else { return false; }
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        throw new Error("Error inserting order detail: " + error.message);
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
    updateOrderStatus,
    insertOrderDetailServices

}