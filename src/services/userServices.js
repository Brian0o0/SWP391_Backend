//CRUD of User with database
const express = require('express');
const { pool } = require('../config/database');
const { connectToDatabase } = require('../config/database');
const bcrypt = require('bcrypt');

//get user from database function
const getAllUsers = async (req, res) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from [User]";
        const result = await request.query(sqlString);
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
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select top 1 * from [User] where UserId = @id";
        request.input('id', userId);
        const result = await request.query(sqlString);
        const user = result.recordset[0];
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by ID:', error);
        return null;
    }
}
//get user by username from database function
const getUserByUserNames = async (userName) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "SELECT TOP 1 * FROM [User] WHERE UserName = @UserName";
        request.input('userName', userName);
        const result = await request.query(sqlString);
        const user = result.recordset[0];
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by ID:', error);
        return null;
    }
}
//get user by name from database function
const getUserByNames = async (name) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "SELECT * FROM [User] WHERE Name like @name";
        request.input('name', '%' + name + '%');
        const result = await request.query(sqlString);
        const user = result.recordset;
        console.log(user);
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by name:', error);
        return null;
    }
}

const getUserByEmails = async (email) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "SELECT TOP 1 * FROM [User] WHERE Email like @email";
        request.input('email', email);
        const result = await request.query(sqlString);
        const user = result.recordset;
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by name:', error);
        return null;
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
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "SELECT TOP 1 * FROM [User] WHERE Email = @email";
        request.input('email', email);
        const result = await request.query(sqlString);
        const user = result.recordset[0];
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error check email:', error);
        return null;
    }
}
const checkUserNameValid = async (userName) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "SELECT TOP 1 * FROM [User] WHERE UserName = @UserName";
        request.input('userName', userName);
        const result = await request.query(sqlString);
        const user = result.recordset[0];
        return user;
    } catch (error) {
        // Handle any errors
        console.error('Error getting user by ID:', error);
        return null;
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
        const pool = await connectToDatabase();
        const hashPassword = bcrypt.hashSync(user.PassWord, 10);
        const request = pool.request();
        const sqlString = `
            UPDATE [User]
            SET PassWord = @passWord, Name = @name, Phone = @phone, Address = @address, Role = @role, UserName = @userName,  Email = @email
            WHERE UserId = @userId
        `;
        request.input('passWord', hashPassword);
        request.input('name', user.Name);
        request.input('phone', user.Phone);
        request.input('address', user.Address);
        request.input('role', user.Role);
        request.input('userName', user.UserName);
        request.input('email', user.Email);
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
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
            DELETE FROM [User]
            WHERE UserId = @id
        `;
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
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
            INSERT INTO [User] (PassWord, Name, Phone, Address, Email, Role, UserName)
            OUTPUT INSERTED.UserId, INSERTED.PassWord, INSERTED.Name, INSERTED.Phone, INSERTED.Address, INSERTED.Email, INSERTED.Role, INSERTED.UserName
            VALUES (@PassWord, @Name, @Phone, @Address, @Email, @Role, @UserName)
        `;
        request.input('PassWord', user.PassWord);
        request.input('Name', user.Name);
        request.input('Phone', user.Phone);
        request.input('Address', user.Address);
        request.input('Email', user.Email);
        request.input('Role', 2);
        request.input('UserName', user.UserName);
        // Thực hiện truy vấn
        const result = await request.query(sqlString);
        if (result.recordset && result.recordset.length > 0) {
            return result.recordset[0];
        } else {
            throw new Error("Failed to insert order");
        }
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        throw new Error("Error inserting user: " + error.message);
        return null;
    }
}

const insertUserOnGoogles = async (user) => {
    try {
        if (user.Email) {
            const checkInsert = await insertUsers(user);
            if (checkInsert.length <= 0) {
                return null;
            } else {
                return checkInsert;
            }
        } else {
            return null;
        }
    } catch (err) {
        throw new Error("Error inserting user: " + err.message);
        return null;
    }
}

const getTotalUsers = async (req, res) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "SELECT COUNT(*) AS TotalUser FROM [User]";
        const result = await request.query(sqlString);
        const totalUser = result.recordset;
        console.log(totalUser);
        return totalUser;
    } catch (error) {
        console.log(error.message)
        return null;
    }
}

module.exports = {
    getAllUsers,
    getTotalUsers,
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