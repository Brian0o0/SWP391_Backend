//Material functionality handles receiving and sending data from the database to the user

const { getAllCostMaterials, getCostMaterialByIds, insertCostMaterials, deleteCostMaterialByIds, updateCostMaterialByIds, getAllMaterials, getMaterialByIds, insertMaterials, updateMaterialByIds, deleteMaterialByIds } = require('../services/materialServices');

const getAllCostMaterial = async (req, res) => {
    try {
        const cost = await getAllCostMaterials();

        if (cost == null) {
            return res.json({
                status: 'err',
                message: 'Empty cost material list'
            });
        } else {
            res.json(cost);
        }

    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        });
    }
}

const getCostMaterialById = async (req, res) => {
    try {
        const { costIdMaterial } = req.body
        const cost = await getCostMaterialByIds(costIdMaterial);
        if (cost == null) {
            return res.json({
                status: 'err',
                message: 'Empty cost material list'
            });
        } else {
            res.json(cost);
        }

    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        });
    }
}

const insertCostMaterial = async (req, res) => {
    try {
        const { costMaterial } = req.body
        if (costMaterial) {
            const check = await insertCostMaterials(costMaterial);
            if (check == false) {
                return res.json({
                    status: 'error',
                    message: 'Insert cost material fail'
                });
            } else {
                return res.json({
                    status: 'success',
                    message: 'Insert cost material successfully'
                });
            }
        } else {
            return res.json({
                status: 'err',
                message: 'Cost Material is required'
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const deleteCostMaterialById = async (req, res) => {
    try {
        const { costIdMaterial } = req.body
        const check = await deleteCostMaterialByIds(costIdMaterial);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Delete cost material fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Delete cost material successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const updateCostMaterialById = async (req, res) => {
    try {
        const { costIdMaterial, dateOfPrice, priceOfMaterial } = req.body
        const check = await updateCostMaterialByIds(costIdMaterial, dateOfPrice, priceOfMaterial);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Update cost material fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Update cost material successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const getAllMaterial = async (req, res) => {
    try {
        const cost = await getAllMaterials();

        if (cost == null) {
            return res.json({
                status: 'err',
                message: 'Empty material list'
            });
        } else {
            res.json(cost);
        }

    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        });
    }
}

const getMaterialById = async (req, res) => {
    try {
        const { materialId } = req.body
        const cost = await getMaterialByIds(materialId);
        if (cost == null) {
            return res.json({
                status: 'err',
                message: 'Empty material list'
            });
        } else {
            res.json(cost);
        }

    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        });
    }
}

const insertMaterial = async (req, res) => {
    try {
        const { Name, Unit, BuyPrice, CostIDMaterial } = req.body
        if (Name && Unit && BuyPrice && CostIDMaterial) {
            const material = {
                Name: Name,
                Unit: Unit,
                BuyPrice: parseFloat(BuyPrice),
                CostIDMaterial: parseInt(CostIDMaterial)

            }
            const check = await insertMaterials(material);
            if (check == false) {
                return res.json({
                    status: 'error',
                    message: 'Insert material fail'
                });
            } else {
                return res.json({
                    status: 'success',
                    message: 'Insert material successfully'
                });
            }
        } else {
            return res.json({
                status: 'err',
                message: 'Material is required'
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const deleteMaterialById = async (req, res) => {
    try {
        const { MaterialID } = req.body
        const check = await deleteMaterialByIds(MaterialID);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Delete material fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Delete material successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const updateMaterialById = async (req, res) => {
    try {
        const { Name, Unit, BuyPrice, CostIDMaterial, MaterialID } = req.body
        const material = {
            Name: Name,
            Unit: Unit,
            BuyPrice: parseFloat(BuyPrice),
            CostIDMaterial: parseInt(CostIDMaterial),
            MaterialID: MaterialID

        }
        const check = await updateMaterialByIds(material);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Update material fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Update material successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
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