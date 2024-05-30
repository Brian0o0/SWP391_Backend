//CRUD of gem with database

const express = require('express');
const { pool } = require('../config/database');

//get all cost gem from database function
const getAllCostGems = async () => {
    try {
        await pool.connect();
        var sqlString = "select * from CostGem";
        const result = await pool.request().query(sqlString);
        const cost = result.recordset;
        console.log(cost);
        return cost;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}

//get cost gem by id from database function
const getCostGemByIds = async (costIDGem) => {
    try {
        await pool.connect();
        var sqlString = "select * from CostGem where CostIDGem = @CostIDGem;";
        const request = pool.request();
        request.input('CostIDGem', costIDGem);
        const result = await request.query(sqlString);
        const cost = result.recordset;
        console.log(cost);
        return cost;
    } catch (error) {
        console.log("Error:", error);
        return null;
    } finally {
        pool.close();
    }
}
// ham lay ngay hien tai cua he thong
const getDayNow = () => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;
        return date;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}



//insert product to database function
const insertCostGems = async (price) => {
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO CostGem (DateOfPrice, PriceOfGem) VALUES (@dateOfPrice, @priceOfgem)
        `;
        const request = pool.request();
        request.input('dateOfPrice', getDayNow());
        request.input('priceOfgem', price);
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
const updateCostGemById = async (req, res) => {
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
const deleteCostGemByIds = async (costGemID) => {
    try {
        await pool.connect();
        const sqlString = `
        DELETE FROM CostGem WHERE CostIDGem = @costGemID
        `;
        const request = pool.request();
        request.input('costGemID', costGemID);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}


module.exports = {
    getAllCostGems,
    getCostGemByIds,
    insertCostGems,
    updateCostGemById,
    deleteCostGemByIds,
}