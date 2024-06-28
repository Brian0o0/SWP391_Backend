//CRUD of material with database

const { pool } = require('../config/database');
// Đảm bảo kết nối pool được mở
pool.connect().then(() => {
    console.log('Connected to the database.');
}).catch(err => {
    console.error('Database connection failed:', err);
});

//get all CostMaterial from database function
const getAllCostMaterials = async () => {
    try {
        const request = pool.request();
        var sqlString = "select * from CostMaterial";
        const result = await request.query(sqlString);
        const costMaterial = result.recordset;
        console.log(costMaterial);
        return costMaterial;
    } catch (error) {
        console.log(error);
        return null;
    }
}
//get CostMaterial by id from database function
const getCostMaterialByIds = async (costIdMaterial) => {
    try {
        const request = pool.request();
        var sqlString = "select * from CostMaterial where CostIdMaterial = @costIdMaterial;";
        request.input('costIdMaterial', costIdMaterial);
        const result = await request.query(sqlString);
        const costMaterial = result.recordset;
        console.log(costMaterial);
        return costMaterial;
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
//insert CostMaterial to database function
const insertCostMaterials = async (price) => {
    try {
        const request = pool.request();
        const sqlString = `
        INSERT INTO CostMaterial (DateOfPrice, PriceOfMaterial) VALUES (@dateOfPrice, @priceOfMaterial)
        `;
        let priceTemp = parseInt(price, 10)
        request.input('dateOfPrice', getDayNow());
        request.input('priceOfMaterial', priceTemp);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        throw new Error("Error inserting cost material: " + error.message);
        return false;
    }
}
//update CostMaterial on database function
const updateCostMaterialByIds = async (costIdMaterial, priceOfMaterial) => {
    try {
        const request = pool.request();
        const sqlString = `
            UPDATE CostMaterial
            SET DateOfPrice = @dateOfPrice, priceOfMaterial = @priceOfMaterial
            WHERE CostIdMaterial = @costIdMaterial
        `;
        request.input('dateOfPrice', getDayNow());
        request.input('priceOfMaterial', priceOfMaterial);
        request.input('costIdMaterial', costIdMaterial);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//delete CostMaterial by id on database function
const deleteCostMaterialByIds = async (costIdMaterial) => {
    try {
        const request = pool.request();
        const sqlString = `
        DELETE FROM CostMaterial WHERE  CostIdMaterial = @costIdMaterial
        `;
        request.input('costIdMaterial', costIdMaterial);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
//get all Material from database function
const getAllMaterials = async () => {
    try {
        const request = pool.request();
        var sqlString = "select * from Material";
        const result = await request.query(sqlString);
        const Material = result.recordset;
        console.log(Material);
        return Material;
    } catch (error) {
        console.log(error);
        return null;
    }
}
//get Material by id from database function
const getMaterialByIds = async (materialId) => {
    try {
        const request = pool.request();
        var sqlString = "select * from Material where MaterialID = @materialId;";
        request.input('materialId', materialId);
        const result = await request.query(sqlString);
        const material = result.recordset;
        console.log(material);
        return material;
    } catch (error) {
        console.log("Error:", error);
        return null;
    }
}

//insert Material to database function
const insertMaterials = async (material) => {
    try {
        const request = pool.request();
        const sqlString = `
        INSERT INTO Material (Name, Unit, BuyPrice, CostIdMaterial) VALUES (@name, @unit, @buyPrice, @costIdMaterial)
        `;
        request.input('name', material.Name);
        request.input('unit', material.Unit);
        request.input('buyPrice', material.BuyPrice);
        request.input('costIdMaterial', material.CostIDMaterial);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        // Xử lý bất kỳ lỗi nào
        throw new Error("Error inserting material: " + error.message);
        return false;
    }
}

//update Material on database function
const updateMaterialByIds = async (material) => {
    try {
        const request = pool.request();
        const sqlString = `
            UPDATE Material
            SET Name = @Name, Unit = @Unit, BuyPrice = @BuyPrice ,CostIdMaterial = @CostIdMaterial
            WHERE MaterialID = @MaterialID
        `;
        request.input('Name', material.Name);
        request.input('Unit', material.Unit);
        request.input('BuyPrice', material.BuyPrice);
        request.input('CostIdMaterial', material.CostIDMaterial);
        request.input('MaterialID', material.MaterialID);
        // Thực hiện truy vấn
        await request.query(sqlString);
        // Gửi phản hồi
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

//delete Material by id on database function
const deleteMaterialByIds = async (MaterialID) => {
    try {
        const request = pool.request();
        const sqlString = `
        DELETE FROM Material WHERE  MaterialID = @MaterialID
        `;
        request.input('MaterialID', MaterialID);
        await request.query(sqlString);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

module.exports = {
    getAllCostMaterials,
    getCostMaterialByIds,
    insertCostMaterials,
    updateCostMaterialByIds,
    deleteCostMaterialByIds,
    getAllMaterials,
    getMaterialByIds,
    insertMaterials,
    updateMaterialByIds,
    deleteMaterialByIds,
}
// Đảm bảo pool kết nối được đóng khi ứng dụng kết thúc
process.on('exit', () => {
    pool.close().then(() => {
        console.log('Database connection closed.');
    }).catch(err => {
        console.error('Error closing database connection:', err);
    });
});