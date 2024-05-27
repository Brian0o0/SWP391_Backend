const express = require('express');
const { pool } = require('../config/database');


const getUser = async (req, res) => {
    try {
        await pool.connect();
        var sqlString = "select * from [User]";
        const result = await pool.request().query(sqlString);
        const test = result.recordset;
        console.log(test);
        res.json(test);
    } catch (error) {
        console.log("4")
        res.status(500).json(error);
    }
}

const getUserById = async (userId) => {
    try {
        await pool.connect();
        var sqlString = "select * from [User] where UserID = @id";
        const request = pool.request();
        request.input('id', userId);
        const result = await request.query(sqlString);
        const user = result.recordset;
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by ID:', error);
        return null;
    } finally {
        pool.close();
    }
}

const getUserByUserName = async (userName) => {
    try {
        await pool.connect();
        var sqlString = "select * from [User] where UserName = @userName";
        const request = pool.request();
        request.input('userName', userName);
        const result = await request.query(sqlString);
        const user = result.recordset;
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by ID:', error);
        return null;
    } finally {
        pool.close();
    }
}

const checkEmailValid = async (email) => {
    try {
        await pool.connect();
        var sqlString = "select * from [User] where Email = @email";
        const request = pool.request();
        request.input('email', email);
        const result = await request.query(sqlString);
        const user = result.recordset;
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error check email:', error);
        return null;
    } finally {
        pool.close();
    }
}




const updateUserById = async (req, res) => {
    try {
        // Lấy ID người dùng từ tham số yêu cầu
        const userId = 'pnha22';//req.params.id;
        // Lấy dữ liệu người dùng từ thân yêu cầu
        const { Name, Phone, Address, Email } = req.body;
        // Kết nối đến cơ sở dữ liệu
        await pool.connect();
        // Chuỗi truy vấn SQL để cập nhật người dùng
        const sqlString = `
            UPDATE [User]
            SET Name = @Name, Phone = @Phone, Address = @Address, Email = @Email
            WHERE UserID = @userId
        `;
        const request = pool.request();
        request.input('Name', Name);
        request.input('Phone', Phone);
        request.input('Address', Address);
        request.input('Email', Email);
        request.input('userId', userId);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        res.status(200).json({ message: "Cập nhật người dùng thành công" });
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        res.status(500).json({ error: error.message });
    }
}


const deleteUserById = async (req, res) => {
    try {
        // Lấy ID người dùng từ tham số yêu cầu
        const userId = 'pnha22'//req.params.id;
        // Kết nối đến cơ sở dữ liệu
        await pool.connect();
        // Chuỗi truy vấn SQL để xóa người dùng
        const sqlString = `
            DELETE FROM [User]
            WHERE UserID = @id
        `;
        const request = pool.request();
        request.input('id', userId);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        res.status(200).json({ message: "Xóa người dùng thành công" });
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        res.status(500).json({ error: error.message });
    }
}

const insertUser = async (user) => {
    user.PassWord
    try {
        await pool.connect();
        const sqlString = `
            INSERT INTO [User] (PassWord, Name, Phone, Address, Email, Role, UserName)
            VALUES (@PassWord, @Name, @Phone, @Address, @Email, @Role, @UserName)
        `;
        const request = pool.request();
        request.input('PassWord', user.PassWord);
        request.input('Name', user.Name);
        request.input('Phone', user.Phone);
        request.input('Address', user.Address);
        request.input('Email', user.Email);
        request.input('Role', 2);
        request.input('UserName', user.UserName);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        throw new Error("Error inserting user: " + error.message);
        return false;
    }
}


module.exports = { getUser, getUserById, updateUserById, deleteUserById, insertUser, checkEmailValid, getUserByUserName }