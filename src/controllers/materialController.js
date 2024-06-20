//Material functionality handles receiving and sending data from the database to the user

const { getAllCostMaterials, getCostMaterialByIds, insertCostMaterials, deleteCostMaterialByIds, updateCostMaterialByIds, getAllMaterials, getMaterialByIds, insertMaterials, updateMaterialByIds, deleteMaterialByIds } = require('../services/materialServices');

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
            .send(error)
    }
}

const getCostMaterialById = async (req, res) => {
    try {
        const  costIdMaterial  = req.query
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
            .send(error)
    }
}

const insertCostMaterial = async (req, res) => {
    try {
        const { costMaterial } = req.body
        if (costMaterial) {
            const check = await insertCostMaterials(costMaterial);
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
                .send('Cost Material is required')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .send(error)
    }
}

const deleteCostMaterialById = async (req, res) => {
    try {
        const { costIdMaterial } = req.body
        const check = await deleteCostMaterialByIds(costIdMaterial);
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
            .send(error)
    }
}

const updateCostMaterialById = async (req, res) => {
    try {
        const { costIdMaterial, dateOfPrice, priceOfMaterial } = req.body
        const check = await updateCostMaterialByIds(costIdMaterial, dateOfPrice, priceOfMaterial);
        if (check == false) {
            return res
                .status(500)
                .send('Update cost material fail')
        } else {
            return res
                .status(500)
                .send('Update cost material successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
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
            .send(error)
    }
}

const getMaterialById = async (req, res) => {
    try {
        const  materialId  = req.query
        const cost = await getMaterialByIds(materialId);
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
            .send(error)
    }
}

const insertMaterial = async (req, res) => {
    try {
        const { name, unit, buyPrice, costIdMaterial } = req.body
        if (name && unit && buyPrice && costIdMaterial) {
            const material = {
                Name: name,
                Unit: unit,
                BuyPrice: parseFloat(buyPrice),
                CostIDMaterial: parseInt(costIdMaterial)

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
            .send(error)
    }
}

const deleteMaterialById = async (req, res) => {
    try {
        const { materialId } = req.body
        const check = await deleteMaterialByIds(materialId);
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
            .send(error)
    }
}

const updateMaterialById = async (req, res) => {
    try {
        const { name, unit, buyPrice, costIdMaterial, materialId } = req.body
        const material = {
            Name: name,
            Unit: unit,
            BuyPrice: parseFloat(buyPrice),
            CostIDMaterial: parseInt(costIdMaterial),
            MaterialID: materialId

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
            .send(error)
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
    updateMaterialById

}