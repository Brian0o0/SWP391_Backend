//CRUD of category with database
const express = require('express');
const { pool } = require('../config/database');

pool.connect().then(() => {
    console.log('Connected to the database.');
}).catch(err => {
    console.error('Database connection failed:', err);
});

const getAllCategorys = async () => {
    try {
        const request = pool.request();
        var sqlString = "select * from Category";
        const result = await request.query(sqlString);
        const category = result.recordset;
        console.log(category);
        return category;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// lấy category theo ID
const getCategoryByIds = async (categoryId) => {
    try {
        const request = pool.request();
        const sqlString = "SELECT * FROM Category WHERE CategoryID = @categoryId";
        request.input('categoryId', categoryId);
        const result = await request.query(sqlString);
        const category = result.recordset;
        console.log(category);
        return category;
    } catch (error) {
        console.error(error);
        return null;
    }
}


const getCategoryByNames = async (name) => {
    try {
        const request = pool.request();
        const sqlString = "SELECT * FROM Category WHERE Name = @name";
        request.input('name', name);
        const result = await request.query(sqlString);
        const category = result.recordset;
        console.log(category);
        return category;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Thêm Category Mới
const insertCategorys = async (name, description) => {
    try {
        const request = pool.request();
        const sqlString = "INSERT INTO Category (Description, Name) VALUES (@description, @name)";
        request.input('description', name);
        request.input('name', description);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.error("Error inserting category: " + error.message);
        return false;
    }
}

//Cập Nhật Category Theo ID
const updateCategoryByIds = async (categoryId, name, description) => {
    try {
        const request = pool.request();
        const sqlString = `
            UPDATE Category
            SET name = @name, description = @description
            WHERE categoryID = @categoryID
        `;
        request.input('name', name);
        request.input('description', description);
        request.input('categoryID', categoryId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.error("Error updating category: " + error.message);
        return false;
    }
}


//Xóa Category Theo ID
const deleteCategoryByIds = async (categoryId) => {
    try {
        const request = pool.request();
        const sqlString = "DELETE FROM Category WHERE CategoryID = @categoryId";
        request.input('categoryId', categoryId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.error("Error deleting category: " + error.message);
        return false;
    }
}
//
module.exports = {
    getAllCategorys,
    getCategoryByIds,
    insertCategorys,
    updateCategoryByIds,
    deleteCategoryByIds,
    getCategoryByNames,
}
// Đảm bảo pool kết nối được đóng khi ứng dụng kết thúc
process.on('exit', () => {
    pool.close().then(() => {
        console.log('Database connection closed.');
    }).catch(err => {
        console.error('Error closing database connection:', err);
    });
});
