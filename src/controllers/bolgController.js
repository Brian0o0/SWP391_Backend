//Gem functionality handles receiving and sending data from the database to the user
const { getAllCostGems, getCostGemByIds, insertCostGems, updateCostGemByIds, deleteCostGemByIds, getAllGems, getGemByIds, insertGems, updateGemByIds, deleteGemByIds } = require('../services/gemServices');

const getAllCostGem = async (req, res) => {
    try {
        const cost = await getAllCostGems();

        if (cost == null) {
            return res
                .status(404)
                .sen ('Empty gem price list')
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
            return res
                .status (404)
                .sen('Empty gem price list')
        } else {
            res.json(cost);
        }

    } catch (error) {
        return res
            .status(500)
            .sen (error)
    }
}

const insertCostGem = async (req, res) => {
    try {
        const { costGem } = req.body

        if (costGem) {
            const check = await insertCostGems(costGem);
            if (check == false) {
                return res
                    .status(500)
                    .sen ('Insert cost gem fail')
            } else {
                return res
                    .status(200)
                    .sen('Insert cost gem successfully')
            }
        } else {
            return res
                .status(400)
                .sen ('CostGem is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status (500)
            .sen (error)
    }
}
const deleteCostGemById = async (req, res) => {
    try {
        const { costGemID } = req.body
        const check = await deleteCostGemByIds(costGemID);
        if (check == false) {
            return res
                .status (500)
                .sen ('Delete cost gem fail')
        } else {
            return res
                .status (200)
                .sen ('Delete cost gem successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen (error)
    }
}

const updateCostGemById = async (req, res) => {
    try {
        const { costGemID, dateOfPrice, priceOfGem } = req.body
        const check = await updateCostGemByIds(costGemID, dateOfPrice, priceOfGem);
        if (check == false) {
            return res
                .status(500)
                .sen ('Update cost gem fail')
        } else {
            return res
                .status(200)
                .sen('Update cost gem successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen (error)
    }
}


const getAllGem = async (req, res) => {
    try {
        const cost = await getAllGems();

        if (cost == null) {
            return res
                .status(404)
                .sen('Empty gem price list')
        } else {
            res.json(cost);
        }

    } catch (error) {
        res.status(500).sen(error);
    }
}

const getGemById = async (req, res) => {
    try {
        const { gemId } = req.body;
        const gem = await getGemByIds(gemId);
        if (gem == null) {
            return res
                .status(404)
                .sen('Empty gem list')
        } else {
            res.json(gem);
        }
    } catch (error) {
        res.status(500).sen(error);
    }
}

const insertGem = async (req, res) => {
    try {
        const { name, color, caraWeight, clarity, cut, costIdGem, addedDate, origin, image, identification } = req.body
        if (name && color && caraWeight && clarity && cut && costIdGem && addedDate && origin && image && identification) {
            const gem = {
                Name: name,
                Color: color,
                CaraWeight: parseFloat(caraWeight),
                Clarity: clarity,
                Cut: cut,
                CostIDGem: parseInt(costIdGem),
                AddedDate: addedDate,
                Origin: origin,
                Image: image,
                Identification: identification,
            };
            const check = await insertGems(gem);
            if (check == false) {
                return res.json({
                    status: 'error',
                    message: 'Insert gem fail'
                });
            } else {
                return res.json({
                    status: 'success',
                    message: 'Insert gem successfully'
                });
            }
        } else {
            return res.json({
                status: 'err',
                message: 'Name, Color, CaraWeight, Clarity, Cut, CostIDGem, AddedDate, Origin, Image and Identification is required'
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
        const { gemId, name, color, caraWeight, clarity, cut, costIdGem, addedDate, origin, image, identification } = req.body
        const gem = {
            GemId: parseInt(gemId),
            Name: name,
            Color: color,
            CaraWeight: parseFloat(caraWeight),
            Clarity: clarity,
            Cut: cut,
            CostIDGem: parseInt(costIdGem),
            AddedDate: addedDate,
            Origin: origin,
            Image: image,
            Identification: identification,
        };
        const check = await updateGemByIds(gem);
        if (check == false) {
            return res
                .status(500)
                .sen('Update gem fail')
        } else {
            return res
                .status(200)
                .sen('Update gem successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status()
            .sen (error)
    }
}

const deleteGemById = async (req, res) => {
    try {
        const { gemId } = req.body
        if (gemId) {
            const check = await deleteGemByIds(gemId);
            if (check == false) {
                return res
                    .status(500)
                    .sen ('Delete gem fail')
            } else {
                return res
                    .status (200)
                    .sen ('Delete gem successfully')
            }
        } else {
            return res
                .status(400)
                .sen('gemId is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
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