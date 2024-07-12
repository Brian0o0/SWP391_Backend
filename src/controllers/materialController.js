//Material functionality handles receiving and sending data from the database to the user

const { getAllCostMaterials, getCostMaterialByIds, insertCostMaterials, deleteCostMaterialByIds, updateCostMaterialByIds, getAllMaterials, getMaterialByIds, insertMaterials, updateMaterialByIds, deleteMaterialByIds, getCostMaterialByMaterialIds } = require('../services/materialServices');

const getAllCostMaterial = async (req, res) => {
    try {
        const cost = await getAllCostMaterials();

        if (cost.length <= 0) {
            return res
                .status(404)
                .send('Empty cost material list')
        } else {
            res.status(200).json(cost);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const getCostMaterialById = async (req, res) => {
    try {
        const costIdMaterial = req.query.CostIdMaterial;
        const cost = await getCostMaterialByIds(costIdMaterial);
        if (cost.length <= 0) {
            return res
                .status(404)
                .send('Empty cost material list')
        } else {
            res.status(200).json(cost);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const getCostMaterialByMaterialId = async (req, res) => {
    try {
        const MaterialId = req.query.MaterialId;
        const cost = await getCostMaterialByMaterialIds(MaterialId);
        if (cost.length <= 0) {
            return res
                .status(404)
                .send('Empty cost material list')
        } else {
            res.status(200).json(cost);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const insertCostMaterial = async (req, res) => {
    try {
        const { PurchasePrice, Price, MaterialId } = req.body
        if (PurchasePrice && Price && MaterialId) {
            const check = await insertCostMaterials(PurchasePrice, Price, MaterialId);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert cost material fail')
            } else {
                return res
                    .status(200)
                    .send('Insert cost material successfully')
            }
        } else {
            return res
                .status(400)
                .send('PurchasePrice, price and materialId is required')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const deleteCostMaterialById = async (req, res) => {
    try {
        const { CostIdMaterial } = req.body
        const check = await deleteCostMaterialByIds(CostIdMaterial);
        if (check == false) {
            return res
                .status(500)
                .send('Delete cost material fail')
        } else {
            return res
                .status(200)
                .send('Delete cost material successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const updateCostMaterialById = async (req, res) => {
    try {
        const { CostIdMaterial, PurchasePrice, Price, MaterialId } = req.body
        const check = await updateCostMaterialByIds(CostIdMaterial, PurchasePrice, Price, MaterialId);
        if (check == false) {
            return res
                .status(500)
                .send('Update cost material fail')
        } else {
            return res
                .status(200)
                .send('Update cost material successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const getAllMaterial = async (req, res) => {
    try {
        const cost = await getAllMaterials();

        if (cost.length <= 0) {
            return res
                .status(404)
                .send('Empty material list')
        } else {
            res.status(200).json(cost);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const getMaterialById = async (req, res) => {
    try {
        const materialId = req.query.MaterialId;
        const materials = await getMaterialByIds(materialId);
        if (materials.length <= 0) {
            return res
                .status(404)
                .send('Empty material list')
        } else {
            res.status(200).json(materials);
        }
    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const insertMaterial = async (req, res) => {
    try {
        const { Name, Unit } = req.body
        if (Name && Unit) {
            const material = {
                Name: Name,
                Unit: Unit,
            }
            const check = await insertMaterials(material);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert material fail')
            } else {
                return res
                    .status(200)
                    .send('Insert material successfully')
            }
        } else {
            return res
                .status(400)
                .send('Material is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const deleteMaterialById = async (req, res) => {
    try {
        const { MaterialId } = req.body
        const check = await deleteMaterialByIds(MaterialId);
        if (check == false) {
            return res
                .status(500)
                .send('Delete material fail')
        } else {
            return res
                .status(200)
                .send('Delete material successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const updateMaterialById = async (req, res) => {
    try {
        const { Name, Unit, MaterialId } = req.body
        const material = {
            Name: Name,
            Unit: Unit,
            MaterialId: MaterialId
        }
        const check = await updateMaterialByIds(material);
        if (check == false) {
            return res
                .status(500)
                .send('Update material fail')
        } else {
            return res
                .status(200)
                .send('Update material successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}
module.exports = {
    getAllCostMaterial,
    getCostMaterialById,
    insertCostMaterial,
    deleteCostMaterialById,
    updateCostMaterialById,
    getAllMaterial,
    getMaterialById,
    insertMaterial,
    deleteMaterialById,
    updateMaterialById,
    getCostMaterialByMaterialId

}