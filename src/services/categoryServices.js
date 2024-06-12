//CRUD of category with database
const express = require('express');
const { pool } = require('../config/database');


const getAllCategorys = async () => {
    try {
        await pool.connect();
        var sqlString = "select * from Category";
        const result = await pool.request().query(sqlString);
        const category = result.recordset;
        console.log(category);
        return category;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}

// lấy category theo ID
const getCategoryByIds = async (categoryId) => {
    try {
        await pool.connect();
        const sqlString = "SELECT * FROM Category WHERE CategoryID = @categoryId";
        const request = pool.request();
        request.input('categoryId', categoryId);
        const result = await request.query(sqlString);
        const category = result.recordset;
        console.log(category);
        return category;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        pool.close();
    }
}


const getCategoryByNames = async (name) => {
    try {
        await pool.connect();
        const sqlString = "SELECT * FROM Category WHERE Name = @name";
        const request = pool.request();
        request.input('name', name);
        const result = await request.query(sqlString);
        const category = result.recordset;
        console.log(category);
        return category;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        pool.close();
    }
}

// Thêm Category Mới
const insertCategorys = async (name, description) => {
    try {
        await pool.connect();
        const sqlString = "INSERT INTO Category (Description, Name) VALUES (@description, @name)";
        const request = pool.request();
        request.input('description', name);
        request.input('name', description);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.error("Error inserting category: " + error.message);
        return false;
    } finally {
        pool.close();
    }
}

//Cập Nhật Category Theo ID
const updateCategoryByIds = async (categoryId, name, description) => {
    try {
        await pool.connect();
        const sqlString = `
            UPDATE Category
            SET name = @name, description = @description
            WHERE categoryID = @categoryID
        `;
        const request = pool.request();
        request.input('name', name);
        request.input('description', description);
        request.input('categoryID', categoryId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.error("Error updating category: " + error.message);
        return false;
    } finally {
        pool.close();
    }
}


//Xóa Category Theo ID
const deleteCategoryByIds = async (categoryId) => {
    try {
        await pool.connect();
        const sqlString = "DELETE FROM Category WHERE CategoryID = @categoryId";
        const request = pool.request();
        request.input('categoryId', categoryId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.error("Error deleting category: " + error.message);
        return false;
    } finally {
        pool.close();
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

