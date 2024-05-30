//CRUD of product with database



const express = require('express');
const { pool } = require('../config/database');


//get all product from database function
const getAllProduct = async (req, res) => {
    try {
        await pool.connect();
        var sqlString = "select * from Product";
        const result = await pool.request().query(sqlString);
        const test = result.recordset;
        console.log(test);
        res.json(test);
    } catch (error) {
        console.log("4")
        res.status(500).json(error);
    }
}

//get product by id from database function
const getProductById = async (req, res) => {
    try {
        const { productID } = req.body;
        await pool.connect();
        var sqlString = "select * from Product where ProductID = @productID;";
        const request = pool.request();
        request.input('productID', productID);
        const result = await request.query(sqlString);
        const product = result.recordset;
        console.log(product);
        res.json(product);
    } catch (error) {
        // Handle any errors
        console.log("Error:", error);
        res.status(500).json(error);
    } finally {
        pool.close();
    }
}
//insert product to database function
const insertProduct = async (req, res) => {
    user.PassWord
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO Product (Name, MaterialID, GemID, CategoryID, MaterialCost, GemCost, ProductCost, Image, QuantityGame, Size, WarrantyCard, Description) 
        VALUES (@Name, @MaterialID, @GemID, @CategoryID, @MaterialCost, @GemCost, @ProductCost, @Image, @QuantityGame, @Size, @WarrantyCard, @Description)
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
//update product on database function
const updateProductById = async (req, res) => {
    try {
        // const { productID } = req.body;
        const productID = 14;
        const { Name, MaterialID, GemID, CategoryID, MaterialCost, GemCost, ProductCost, Image, QuantityGame, Size, WarrantyCard, Description } = req.body;
        await pool.connect();
        const sqlString = `
            UPDATE Product
            SET Name = @Name, MaterialID = @MaterialID, GemID = @GemID, CategoryID = @CategoryID
            , MaterialCost = @MaterialCost, GemCost = @GemCost, ProductCost = @ProductCost, Image = @Image
            , QuantityGame = @QuantityGame,Size = @Size, [warranty card] = @WarrantyCard, Description = @Description
            WHERE ProductID = @productID
        `;
        const request = pool.request();
        request.input('Name', Name);
        request.input('MaterialID', MaterialID);
        request.input('GemID', GemID);
        request.input('CategoryID', CategoryID);
        request.input('MaterialCost', MaterialCost);
        request.input('GemCost', GemCost);
        request.input('ProductCost', ProductCost);
        request.input('Image', Image);
        request.input('QuantityGame', QuantityGame);
        request.input('Size', Size);
        request.input('WarrantyCard', WarrantyCard);
        request.input('Description', Description);
        request.input('productID', productID);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        res.status(200).json({ message: "Update Product sucessful" });
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        res.status(500).json({ error: error.message });
    }
}
//delete product by id on database function
const deleteProductById = async (req, res) => {
    try {
        const { productID } = req.body;
        await pool.connect();
        const sqlString = `
        DELETE FROM Product WHERE ProductID = @productId
        `;
        const request = pool.request();
        request.input('productId', productID);
        await request.query(sqlString);
        res.status(200).json({ message: "Delete product successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllProduct, getProductById, insertProduct, deleteProductById, updateProductById
}