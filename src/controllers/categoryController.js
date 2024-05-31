//Category functionality handles receiving and sending data from the database to the user
//Gem functionality handles receiving and sending data from the database to the user
const { getAllCostGems, getCostGemByIds, insertCostGems, updateCostGemByIds, deleteCostGemByIds } = require('../services/gemServices');

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
module.exports = {
    getAllCostGem,
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
module.exports = {
    getAllCostGem,
    getCostGemById,
    insertCostGem,
    deleteCostGemById,
    updateCostGemById
}