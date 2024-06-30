//CRUD of gem with database
const express = require('express');
const { connectToDatabase } = require('../config/database');


//get all cost gem from database function
const getAllCostGems = async () => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from CostGem";
        const result = await request.query(sqlString);
        const cost = result.recordset;
        console.log(cost);
        return cost;
    } catch (error) {
        console.log(error);
        return null;
    }
}

//get cost gem by id from database function
const getCostGemByIds = async (costIdGem) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from CostGem where CostIdGem = @CostIdGem;";
        request.input('CostIdGem', costIdGem);
        const result = await request.query(sqlString);
        const cost = result.recordset;
        console.log(cost);
        return cost;
    } catch (error) {
        console.log("Error:", error);
        return null;
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
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
        INSERT INTO CostGem (DateOfPrice, PriceOfGem) VALUES (@dateOfPrice, @priceOfgem)
        `;
        let priceTemp = parseInt(price, 10)
        request.input('dateOfPrice', getDayNow());
        request.input('priceOfgem', priceTemp);
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
const updateCostGemByIds = async (costGemId, priceOfGem) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
            UPDATE CostGem
            SET DateOfPrice = @dateOfPrice, PriceOfGem = @priceOfGem
            WHERE CostIdGem = @costGemId
        `;
        request.input('dateOfPrice', getDayNow());
        request.input('priceOfGem', priceOfGem);
        request.input('costGemID', costGemId);
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
const deleteCostGemByIds = async (costGemId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
        DELETE FROM CostGem WHERE CostIDGem = @costGemId
        `;
        request.input('costGemId', costGemId);
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
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = "select * from Gem";
        const result = await request.query(sqlString);
        const gems = result.recordset;
        let gemList = [];
        for (const gem of gems) {
            if (gem.Image) {
                try {
                    gem.Image = JSON.parse(gem.Image);
                } catch (error) {
                    console.error(`Error parsing Image JSON for gem ID ${gem.GemId}:`, error);
                }
            }
            gemList.push(gem);
        }
        console.log(gemList);
        return gemList;
    } catch (error) {
        console.log(error);
        return null;
    }
}

//get gem by id from database function
const getGemByIds = async (gemId) => {
    try {
        const request = pool.request();
        var sqlString = `select * from Gem where GemId = @gemId;`
        request.input('gemId', gemId);
        const result = await request.query(sqlString);
        const gems = result.recordset;
        const gem = gems[0];
        if (gem.Image) {
            try {
                gem.Image = JSON.parse(gem.Image);
            } catch (error) {
                console.error(`Error parsing Image JSON for gem ID ${gem.GemId}:`, error);
            }
        }
        console.log(gem);
        return gem;
    } catch (error) {
        console.log("Error:", error);
        return null;
    }
}
//insert gem to database function
const insertGems = async (gem) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        const imgTemp = JSON.stringify(gem.Image);
        const sqlString = `
        INSERT INTO Gem (Name, Color, CaraWeight, Clarity, Cut, CostIdGem, AddedDate, Origin, Image,Identification,Size) 
VALUES (@name, @color, @caraWeight, @clarity, @cut, @costIdGem, @addedDate, @origin, @image, @identification, @size)
        `;
        request.input('name', gem.Name);
        request.input('color', gem.Color);
        request.input('caraWeight', gem.CaraWeight);
        request.input('clarity', gem.Clarity);
        request.input('cut', gem.Cut);
        request.input('costIdGem', gem.CostIdGem);
        request.input('addedDate', gem.AddedDate);
        request.input('origin', gem.Origin);
        request.input('image', imgTemp);
        request.input('identification', gem.Identification);
        request.input('size', gem.Size);

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
        const pool = await connectToDatabase();
        const request = pool.request();
        const imgTemp = JSON.stringify(gem.Image);
        const sqlString = `
            UPDATE Gem
            SET Name = @name, Color = @color, CaraWeight = @caraWeight, Clarity = @clarity, Cut = @cut, CostIdGem = @costIdGem, 
            AddedDate = @addedDate, Origin = @origin, Image = @image,Identification = @identification, Size = @size
            WHERE GemID = @gemId
        `;
        request.input('name', gem.Name);
        request.input('color', gem.Color);
        request.input('caraWeight', gem.CaraWeight);
        request.input('clarity', gem.Clarity);
        request.input('cut', gem.Cut);
        request.input('costIdGem', gem.CostIdGem);
        request.input('addedDate', gem.AddedDate);
        request.input('origin', gem.Origin);
        request.input('image', imgTemp);
        request.input('identification', gem.Identification);
        request.input('size', gem.Size);
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
        const pool = await connectToDatabase();
        const request = pool.request();
        const sqlString = `
        DELETE FROM Gem WHERE GemId = @gemId
        `;
        request.input('gemId', gemId);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const getGemByCostId = async (costId) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = `select * from Gem where CostIdGem = @costId`
        request.input('costId', costId);
        const result = await request.query(sqlString);
        const gem = result.recordset;
        // console.log(gem);
        return gem;
    } catch (error) {
        console.log("Error:", error);
        return null;
    }
}

const getGemByPrices = async (firstPrice, secondPrice) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();
        var sqlString = `SELECT * FROM CostGem WHERE PriceOfGem BETWEEN @firstPrice AND @secondPrice;`
        request.input('firstPrice', firstPrice);
        request.input('secondPrice', secondPrice);
        const result = await request.query(sqlString);
        const costGemTemp = result.recordset;
        console.log(costGemTemp)
        const gemDetails = [];
        for (const costGem of costGemTemp) {
            const gemTemp = await getGemByCostId(costGem.CostIdGem);
            for (const gem of gemTemp) {
                const gemDetail = {
                    Name: gem.Name,
                    Color: gem.Color,
                    CaraWeight: gem.CaraWeight,
                    Clarity: gem.Clarity,
                    Cut: gem.Cut,
                    Origin: gem.Origin,
                    Image: gem.Image = JSON.parse(gem.Image),
                    Identification: gem.Identification,
                    Size: gem.Size,
                };
                gemDetails.push(gemDetail);
            }
        }
        return gemDetails;
    } catch (error) {
        console.log("Error:", error);
        return null;
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
    getGemByPrices,
    getDayNow,
}
// Đảm bảo pool kết nối được đóng khi ứng dụng kết thúc
process.on('exit', () => {
    pool.close().then(() => {
        console.log('Database connection closed.');
    }).catch(err => {
        console.error('Error closing database connection:', err);
    });
});