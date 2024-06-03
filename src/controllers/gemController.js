//Gem functionality handles receiving and sending data from the database to the user
const { getAllCostGems, getCostGemByIds, insertCostGems, updateCostGemByIds, deleteCostGemByIds, getAllGems, getGemByIds, insertGems, updateGemByIds, deleteGemByIds } = require('../services/gemServices');

const getAllCostGem = async (req, res) => {
    try {
        const cost = await getAllCostGems();

        if (cost == null) {
            return res.json({
                status: 'err',
                message: 'Empty gem price list'
            });
        } else {
            res.json(cost);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}


const getCostGemById = async (req, res) => {
    try {
        const { costGemID } = req.body
        const cost = await getCostGemByIds(costGemID);
        console.log(cost);
        if (cost == null) {
            return res.json({
                status: 'err',
                message: 'Empty gem price list'
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

const insertCostGem = async (req, res) => {
    try {
        const { costGem } = req.body
        if (costGem) {
            const check = await insertCostGems(costGem);
            if (check == false) {
                return res.json({
                    status: 'error',
                    message: 'Insert cost gem fail'
                });
            } else {
                return res.json({
                    status: 'success',
                    message: 'Insert cost gem successfully'
                });
            }
        } else {
            return res.json({
                status: 'err',
                message: 'CostGem is required'
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
const deleteCostGemById = async (req, res) => {
    try {
        const { costGemID } = req.body
        const check = await deleteCostGemByIds(costGemID);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Delete cost gem fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Delete cost gem successfully'
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

const updateCostGemById = async (req, res) => {
    try {
        const { costGemID, dateOfPrice, priceOfGem } = req.body
        const check = await updateCostGemByIds(costGemID, dateOfPrice, priceOfGem);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Update cost gem fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Update cost gem successfully'
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


const getAllGem = async (req, res) => {
    try {
        const cost = await getAllGems();

        if (cost == null) {
            return res.json({
                status: 'err',
                message: 'Empty gem price list'
            });
        } else {
            res.json(cost);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

const getGemById = async (req, res) => {
    try {
        const { gemId } = req.body;
        const gem = await getGemByIds(gemId);
        if (gem == null) {
            return res.json({
                status: 'err',
                message: 'Empty gem list'
            });
        } else {
            res.json(gem);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const insertGem = async (req, res) => {
    try {
        const { Name, Color, CaraWeight, Clarity, Cut, CostIDGem, AddedDate, Origin, Image, Identification } = req.body
        if (Name && Color && CaraWeight && Clarity && Cut && CostIDGem && AddedDate && Origin && Image && Identification) {
            const gem = {
                Name: Name,
                Color: Color,
                CaraWeight: parseFloat(CaraWeight),
                Clarity: Clarity,
                Cut: Cut,
                CostIDGem: parseInt(CostIDGem),
                AddedDate: AddedDate,
                Origin: Origin,
                Image: Image,
                Identification: Identification,
            };
            const check = await insertGems(gem);
            if (check == false) {
                return res.json({
                    status: 'error',
                    message: 'Insert cost gem fail'
                });
            } else {
                return res.json({
                    status: 'success',
                    message: 'Insert cost gem successfully'
                });
            }
        } else {
            return res.json({
                status: 'err',
                message: 'Name, Color, CaraWeight, Clarity, Cut, CostIDGem, AddedDate, Origin and Identification is required'
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

const updateGemById = async (req, res) => {
    try {
        const { GemId, Name, Color, CaraWeight, Clarity, Cut, CostIDGem, AddedDate, Origin, Image, Identification } = req.body
        const gem = {
            GemId: parseInt(GemId),
            Name: Name,
            Color: Color,
            CaraWeight: parseFloat(CaraWeight),
            Clarity: Clarity,
            Cut: Cut,
            CostIDGem: parseInt(CostIDGem),
            AddedDate: AddedDate,
            Origin: Origin,
            Image: Image,
            Identification: Identification,
        };
        const check = await updateGemByIds(gem);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Update gem fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Update gem successfully'
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

const deleteGemById = async (req, res) => {
    try {
        const { gemId } = req.body
        if (gemId) {
            const check = await deleteGemByIds(gemId);
            if (check == false) {
                return res.json({
                    status: 'error',
                    message: 'Delete gem fail'
                });
            } else {
                return res.json({
                    status: 'success',
                    message: 'Delete gem successfully'
                });
            }
        } else {
            return res.json({
                status: 'error',
                message: 'gemId is required'
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
    getAllCostGem,
    getCostGemById,
    insertCostGem,
    deleteCostGemById,
    updateCostGemById,
    getAllGem,
    getGemById,
    insertGem,
    updateGemById,
    deleteGemById
}