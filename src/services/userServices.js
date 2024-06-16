//CRUD of User with database
const express = require('express');
const { pool } = require('../config/database');

//get user from database function
const getAllUsers = async (req, res) => {
    try {
        await pool.connect();
        var sqlString = "select * from [User]";
        const result = await pool.request().query(sqlString);
        const user = result.recordset;
        console.log(user);
        return user;
    } catch (error) {
        console.log(error.message)
        return null;
    }
}
//get user by id from database function
const getUserByIds = async (userId) => {
    try {
        await pool.connect();
        var sqlString = "select top 1 * from [User] where UserID = @id";
        const request = pool.request();
        request.input('id', userId);
        const result = await request.query(sqlString);
        const user = result.recordset[0];
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by ID:', error);
        return null;
    } finally {
        pool.close();
    }
}
//get user by username from database function
const getUserByUserNames = async (userName) => {
    try {
        await pool.connect();
        var sqlString = "SELECT TOP 1 * FROM [User] WHERE UserName = @UserName";
        const request = pool.request();
        request.input('userName', userName);
        const result = await request.query(sqlString);
        const user = result.recordset[0];
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by ID:', error);
        return null;
    } finally {
        pool.close();
    }
}
//get user by name from database function
const getUserByNames = async (name) => {
    try {
        console.log(name);
        await pool.connect();
        var sqlString = "SELECT * FROM [User] WHERE Name like @name";
        const request = pool.request();
        request.input('name', '%' + name + '%');
        const result = await request.query(sqlString);
        const user = result.recordset;
        console.log(user);
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by name:', error);
        return null;
    } finally {
        pool.close();
    }
}

const getUserByEmails = async (email) => {
    try {
        await pool.connect();
        var sqlString = "SELECT TOP 1 * FROM [User] WHERE Email like @email";
        const request = pool.request();
        request.input('email', email);
        const result = await request.query(sqlString);
        const user = result.recordset;
        console.log(user);
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by name:', error);
        return null;
    } finally {
        pool.close();
    }
}


//check email valid function
const checkEmailValid = async (email) => {
    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    if (!isEmail) {
        console.log("Email is not valid");
        return null;
    }
    try {
        await pool.connect();
        var sqlString = "SELECT TOP 1 * FROM [User] WHERE Email = @email";
        const request = pool.request();
        request.input('email', email);
        const result = await request.query(sqlString);
        const user = result.recordset[0];
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error check email:', error);
        return null;
    } finally {
        pool.close();
    }
}
const checkUserNameValid = async (userName) => {
    try {
        await pool.connect();
        var sqlString = "SELECT TOP 1 * FROM [User] WHERE UserName = @UserName";
        const request = pool.request();
        request.input('userName', userName);
        const result = await request.query(sqlString);
        const user = result.recordset[0];
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by ID:', error);
        return null;
    } finally {
        pool.close();
    }
}
const checkLogin = async (user) => {
    const userEmailTemp = await checkEmailValid(user);
    const userNameTemp = await checkUserNameValid(user);
    if ((userEmailTemp == null) && (userNameTemp == null)) {
        return null;
    } else if ((userEmailTemp != null) && (userNameTemp == null)) {
        return userEmailTemp;
    } else {
        return userNameTemp;
    };
}
//update user by id on database function
const updateUserByIds = async (user) => {
    try {
        await pool.connect();
        const sqlString = `
            UPDATE [User]
            SET Name = @name, Phone = @phone, Address = @address, Role = @role
            WHERE UserID = @userId
        `;
        const request = pool.request();
        request.input('name', user.Name);
        request.input('phone', user.Phone);
        request.input('address', user.Address);
        request.input('role', user.Role);
        request.input('userId', user.UserId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//delete user by id on database function
const deleteUserByIds = async (userId) => {
    try {

        await pool.connect();
        const sqlString = `
            DELETE FROM [User]
            WHERE UserID = @id
        `;
        const request = pool.request();
        request.input('id', userId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//insert user to database function
const insertUsers = async (user) => {
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


const insertUserOnGoogles = async (user) => {
    try {
        if (user.Email) {
            checkInsert = await insertUsers(user);
            if (checkInsert) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        throw new Error("Error inserting user: " + err.message);
        return false;
    }
}

module.exports = {
    getAllUsers,
    getUserByIds,
    updateUserByIds,
    deleteUserByIds,
    insertUsers,
    checkEmailValid,
    getUserByUserNames,
    getUserByNames,
    checkLogin,
    getUserByEmails,
    insertUserOnGoogles,
}