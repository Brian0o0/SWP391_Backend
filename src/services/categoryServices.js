//CRUD of category with database
const express = require('express');
const { pool } = require('../config/database');


const getAllCategories = async () => {
    try {
        await pool.connect();
        var sqlString = "select * from Categories";
        const result = await pool.request().query(sqlString);
        const categories = result.recordset;
        console.log(cost);
        return cost;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}

// lấy category theo ID
const getCategoryById = async (categoryId) => {
    try {
        await pool.connect();
        const sqlString = "SELECT * FROM Category WHERE categoryID = @categoryID";
        const request = pool.request();
        request.input('categoryID', categoryId);
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
const insertCategory = async (name, description) => {
    try {
        await pool.connect();
        const sqlString = "INSERT INTO Category (name, description) VALUES (@name, @description)";
        const request = pool.request();
        request.input('name', name);
        request.input('description', description);
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
const updateCategoryById = async (categoryId, name, description) => {
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
const deleteCategoryById = async (categoryId) => {
    try {
        await pool.connect();
        const sqlString = "DELETE FROM Category WHERE categoryID = @categoryID";
        const request = pool.request();
        request.input('categoryID', categoryId);
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
    getAllCategories,
    getCategoryById,
    insertCategory,
    updateCategoryById,
    deleteCategoryById,
}

