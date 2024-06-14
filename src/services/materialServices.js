//CRUD of material with database

const { pool } = require('../config/database');

//get all CostMaterial from database function
const getAllCostMaterials = async () => {
    try {
        await pool.connect();
        var sqlString = "select * from CostMaterial";
        const result = await pool.request().query(sqlString);
        const costMaterial = result.recordset;
        console.log(costMaterial);
        return costMaterial;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}
//get CostMaterial by id from database function
const getCostMaterialByIds = async (costIdMaterial) => {
    try {
        await pool.connect();
        var sqlString = "select * from CostMaterial where CostIdMaterial = @costIdMaterial;";
        const request = pool.request();
        request.input('costIdMaterial', costIdMaterial);
        const result = await request.query(sqlString);
        const costMaterial = result.recordset;
        console.log(costMaterial);
        return costMaterial;
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
//insert CostMaterial to database function
const insertCostMaterials = async (price) => {
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO CostMaterial (DateOfPrice, PriceOfmaterial) VALUES (@dateOfPrice, @priceOfmaterial)
        `;
        let priceTemp = parseInt(price, 10)
        const request = pool.request();
        request.input('dateOfPrice', getDayNow());
        request.input('priceOfmaterial', priceTemp);
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
        await pool.connect();
        const sqlString = `
            UPDATE CostMaterial
            SET DateOfPrice = @dateOfPrice, PriceOfmaterial = @priceOfmaterial
            WHERE CostIdMaterial = @costIdMaterial
        `;
        const request = pool.request();
        request.input('dateOfPrice', getDayNow());
        request.input('priceOfmaterial', priceOfMaterial);
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
        await pool.connect();
        const sqlString = `
        DELETE FROM CostMaterial WHERE  CostIdMaterial = @costIdMaterial
        `;
        const request = pool.request();
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
        await pool.connect();
        var sqlString = "select * from Material";
        const result = await pool.request().query(sqlString);
        const Material = result.recordset;
        console.log(Material);
        return Material;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        pool.close();
    }
}
//get Material by id from database function
const getMaterialByIds = async (materialId) => {
    try {
        await pool.connect();
        var sqlString = "select * from Material where MaterialID = @materialId;";
        const request = pool.request();
        request.input('materialId', materialId);
        const result = await request.query(sqlString);
        const material = result.recordset;
        console.log(material);
        return material;
    } catch (error) {
        console.log("Error:", error);
        return null;
    } finally {
        pool.close();
    }
}

//insert Material to database function
const insertMaterials = async (material) => {
    try {
        await pool.connect();
        const sqlString = `
        INSERT INTO Material (Name, Unit, BuyPrice, CostIDMaterial) VALUES (@name, @unit, @buyPrice, @costIDMaterial)
        `;
        const request = pool.request();
        request.input('name', material.Name);
        request.input('unit', material.Unit);
        request.input('buyPrice', material.BuyPrice);
        request.input('costIDMaterial', material.CostIDMaterial);
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
        console.log(material);
        await pool.connect();
        const sqlString = `
            UPDATE Material
            SET Name = @Name, Unit = @Unit, BuyPrice = @BuyPrice ,CostIDMaterial = @CostIDMaterial
            WHERE MaterialID = @MaterialID
        `;
        const request = pool.request();
        request.input('Name', material.Name);
        request.input('Unit', material.Unit);
        request.input('BuyPrice', material.BuyPrice);
        request.input('CostIDMaterial', material.CostIDMaterial);
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
        await pool.connect();
        const sqlString = `
        DELETE FROM Material WHERE  MaterialID = @MaterialID
        `;
        const request = pool.request();
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