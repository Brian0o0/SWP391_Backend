//CRUD of product with database



const express = require('express');
const { pool } = require('../config/database');


//get all product from database function
const getAllProducts = async () => {
    try {
        await pool.connect();
        var sqlString = "select * from Product";
        const result = await pool.request().query(sqlString);
        const product = result.recordset;
        console.log(product);
        return product;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}
//get product by id from database function
const getProductByIds = async (productId) => {
    try {
        await pool.connect();
        var sqlString = "select * from Product where ProductID = @productId;";
        const request = pool.request();
        request.input('productId', productId);
        const result = await request.query(sqlString);
        const product = result.recordset;
        console.log(product);
        return product;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}
//insert product to database function
const insertProducts = async (name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description) => {
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO Product (Name, MaterialID, GemID, CategoryID, MaterialCost, GemCost, ProductCost, Image, QuantityGem, Size, [warranty card], Description) 
        VALUES (@name, @materialId, @gemId, @categoryId, @materialCost, @gemCost, @productCost, @image, @quantityGem, @size, @warrantyCard, @description)
        `;
        const request = pool.request();
        request.input('name', name);
        request.input('materialId', materialId);
        request.input('gemId', gemId);
        request.input('categoryId', categoryId);
        request.input('materialCost', materialCost);
        request.input('gemCost', gemCost);
        request.input('productCost', productCost);
        request.input('image', image);
        request.input('quantityGem', quantityGem);
        request.input('size', size);
        request.input('warrantyCard', warrantyCard);
        request.input('description', description);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        throw new Error("Error inserting product: " + error.message);
        return false;
    }
}
//update product on database function
const updateProductByIds = async (name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description, productId) => {
    try {
        await pool.connect();
        const sqlString = `
            UPDATE Product
            SET Name = @name, MaterialID = @materialId, GemID = @gemId, CategoryID = @categoryId
            , MaterialCost = @materialCost, GemCost = @gemCost, ProductCost = @productCost, Image = @image
            , QuantityGem = @quantityGem, Size = @size, [warranty card] = @warrantyCard, Description = @description
            WHERE ProductID = @productId
        `;
        const request = pool.request();
        request.input('name', name);
        request.input('materialId', materialId);
        request.input('gemId', gemId);
        request.input('categoryId', categoryId);
        request.input('materialCost', materialCost);
        request.input('gemCost', gemCost);
        request.input('productCost', productCost);
        request.input('image', image);
        request.input('quantityGem', quantityGem);
        request.input('size', size);
        request.input('warrantyCard', warrantyCard);
        request.input('description', description);
        request.input('productId', productId);
        // Thực hiện truy vấn
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//delete product by id on database function
const deleteProductByIds = async (productId) => {
    try {
        await pool.connect();
        const sqlString = `
        DELETE FROM Product WHERE ProductID = @productId
        `;
        const request = pool.request();
        request.input('productId', productId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

module.exports = {
    getAllProducts, getProductByIds, insertProducts, deleteProductByIds, updateProductByIds
}