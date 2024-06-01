//CRUD of gem with database
var sql = require('mssql/msnodesqlv8');

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
// get day of system
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



//insert cost gem to database function
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
//update cost gem on database function
const updateCostGemByIds = async (costGemID, dateOfPrice, priceOfGem) => {
    try {
        await pool.connect();
        const sqlString = `
            UPDATE CostGem
            SET DateOfPrice = @dateOfPrice, PriceOfGem = @priceOfGem
            WHERE CostIDGem = @costGemID
        `;
        const request = pool.request();
        request.input('dateOfPrice', dateOfPrice);
        request.input('priceOfGem', priceOfGem);
        request.input('costGemID', costGemID);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//delete cost gem by id on database function
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

// get all gem function
const getAllGems = async () => {
    try {
        await pool.connect();
        var sqlString = "select * from Gem";
        const result = await pool.request().query(sqlString);
        const gem = result.recordset;
        console.log(gem);
        return gem;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}

//get gem by id from database function
const getGemByIds = async (gemId) => {
    try {
        await pool.connect();
        var sqlString = `select * from Gem where GemID = @gemId;`
        const request = pool.request();
        request.input('gemId', gemId);
        const result = await request.query(sqlString);
        const gem = result.recordset;
        console.log(gem);
        return gem;
    } catch (error) {
        console.log("Error:", error);
        return null;
    } finally {
        pool.close();
    }
}
//insert gem to database function
const insertGems = async (gem) => {
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO Gem (Name, Color, CaraWeight, Clarity, Cut, CostIDGem, AddedDate, Origin, Image,Identification) 
VALUES (@name, @color, @caraWeight, @clarity, @cut, @costIdGem, @addedDate, @origin, @image, @identification)
        `;
        const request = pool.request();
        request.input('name', gem.Name);
        request.input('color', gem.Color);
        request.input('caraWeight', gem.CaraWeight);
        request.input('clarity', gem.Clarity);
        request.input('cut', gem.Cut);
        request.input('costIdGem', gem.CostIDGem);
        request.input('addedDate', gem.AddedDate);
        request.input('origin', gem.Origin);
        request.input('image', gem.Image);
        request.input('identification', gem.Identification);
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


//update gem on database function
const updateGemByIds = async (gem) => {
    try {
        await pool.connect();
        const sqlString = `
            UPDATE Gem
            SET Name = @name, Color = @color, CaraWeight = @caraWeight, Clarity = @clarity, Cut = @cut, CostIDGem = @costIdGem, 
            AddedDate = @addedDate, Origin = @origin, Image = @image,Identification = @identification
            WHERE GemID = @gemId
        `;
        const request = pool.request();
        request.input('name', gem.Name);
        request.input('color', gem.Color);
        request.input('caraWeight', gem.CaraWeight);
        request.input('clarity', gem.Clarity);
        request.input('cut', gem.Cut);
        request.input('costIdGem', gem.CostIDGem);
        request.input('addedDate', gem.AddedDate);
        request.input('origin', gem.Origin);
        request.input('image', gem.Image);
        request.input('identification', gem.Identification);
        request.input('gemId', gem.GemId);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}


//delete gem by id on database function
const deleteGemByIds = async (gemId) => {
    try {
        await pool.connect();
        const sqlString = `
        DELETE FROM Gem WHERE GemID = @gemId
        `;
        const request = pool.request();
        request.input('gemId', gemId);
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
    updateCostGemByIds,
    deleteCostGemByIds,
    getAllGems,
    getGemByIds,
    insertGems,
    updateGemByIds,
    deleteGemByIds,
}