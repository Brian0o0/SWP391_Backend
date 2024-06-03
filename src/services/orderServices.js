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
//update step on database function
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
//delete step by id on database function
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
}