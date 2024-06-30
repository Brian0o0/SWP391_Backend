//Gem functionality handles receiving and sending data from the database to the user
const { getAllCostGems, getCostGemByIds, insertCostGems, updateCostGemByIds, deleteCostGemByIds, getAllGems, getGemByIds, insertGems, updateGemByIds, deleteGemByIds, getGemByPrices } = require('../services/gemServices');

const getAllCostGem = async (req, res) => {
    try {
        const cost = await getAllCostGems();
        if (cost.length <= 0) {
            return res
                .status(404)
                .send('Empty gem price list')
        } else {
            res.status(200).json(cost);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

const getCostGemById = async (req, res) => {
    try {
        const CostIdGem = req.query.CostIdGem;
        const cost = await getCostGemByIds(CostIdGem);
        console.log(cost);
        if (cost.length <= 0) {
            return res
                .status(404)
                .send('Empty gem price list')
        } else {
            res.status(200).json(cost);
        }
    } catch (error) {
        return res
            .status(500)
            .send(error)
    }
}

const insertCostGem = async (req, res) => {
    try {
        const { PriceOfGem } = req.body

        if (PriceOfGem) {
            const check = await insertCostGems(PriceOfGem);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert cost gem fail')
            } else {
                return res
                    .status(200)
                    .send('Insert cost gem successfully')
            }
        } else {
            return res
                .status(400)
                .send('CostGem is required')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
    }
}

const deleteCostGemById = async (req, res) => {
    try {
        const { CostIdGem } = req.body
        const check = await deleteCostGemByIds(CostIdGem);
        if (check == false) {
            return res
                .status(500)
                .send('Delete cost gem fail')
        } else {
            return res
                .status(200)
                .send('Delete cost gem successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
    }
}

const updateCostGemById = async (req, res) => {
    try {
        const { CostIdGem, DateOfPrice, PriceOfGem } = req.body
        const check = await updateCostGemByIds(CostIdGem, DateOfPrice, PriceOfGem);
        if (check == false) {
            return res
                .status(500)
                .send('Update cost gem fail')
        } else {
            return res
                .status(200)
                .send('Update cost gem successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
    }
}

const getAllGem = async (req, res) => {
    try {
        const gems = await getAllGems();
        if (gems.length <= 0) {
            return res
                .status(404)
                .send('Empty gem list')
        } else {

            res.status(200).json(gems);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getGemById = async (req, res) => {
    try {
        const GemId = req.query.GemId;
        const gems = await getGemByIds(GemId);
        if (gems.length <= 0) {
            return res
                .status(404)
                .send('Gem not found')
        } else {
            res.status(200).json(gems);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const insertGem = async (req, res) => {
    try {
        const { Name, Color, CaraWeight, Clarity, Cut, CostIdGem, AddedDate, Origin, Image, Identification, Size } = req.body
        if (Name && Color && CaraWeight && Clarity && Cut && CostIdGem && AddedDate && Origin && Image && Identification && Size) {
            const gem = {
                Name: Name,
                Color: Color,
                CaraWeight: parseFloat(CaraWeight),
                Clarity: Clarity,
                Cut: Cut,
                CostIdGem: parseInt(CostIdGem),
                AddedDate: AddedDate,
                Origin: Origin,
                Image: Image,
                Identification: Identification,
                Size: parseFloat(Size)
            };
            const check = await insertGems(gem);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert gem fail')
            } else {
                return res
                    .status(200)
                    .send('Insert gem successfully')
            }
        } else {
            return res
                .status(400)
                .send('Name, Color, CaraWeight, Clarity, Cut, CostIDGem, AddedDate, Origin, Image, Identification and Size is required')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
    }
}

const updateGemById = async (req, res) => {
    try {
        const { GemId, Name, Color, CaraWeight, Clarity, Cut, CostIdGem, AddedDate, Origin, Image, Identification, Size } = req.body
        const gem = {
            GemId: parseInt(GemId),
            Name: Name,
            Color: Color,
            CaraWeight: parseFloat(CaraWeight),
            Clarity: Clarity,
            Cut: Cut,
            CostIdGem: parseInt(CostIdGem),
            AddedDate: AddedDate,
            Origin: Origin,
            Image: Image,
            Identification: Identification,
            Size: parseFloat(Size)
        };
        const check = await updateGemByIds(gem);
        if (check == false) {
            return res
                .status(500)
                .send('Update gem fail')
        } else {
            return res
                .status(200)
                .send('Update gem successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
    }
}

const deleteGemById = async (req, res) => {
    try {
        const { GemId } = req.body
        if (GemId) {
            const check = await deleteGemByIds(GemId);
            if (check == false) {
                return res
                    .status(500)
                    .send('Delete gem fail'
                    );
            } else {
                return res
                    .status(200)
                    .send('Delete gem successfully'
                    );
            }
        } else {
            return res
                .status(400)
                .send('GemId is required'
                );
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
    }
}

const getGemByPrice = async (req, res) => {
    try {
        const { firstPrice, secondPrice } = req.body;
        if (firstPrice && secondPrice) {
            if (firstPrice <= secondPrice) {
                console.log(1);
                const gem = await getGemByPrices(firstPrice, secondPrice);
                console.log(gem)
                if (gem.length <= 0) {
                    return res
                        .status(404)
                        .send('Empty gem list')
                } else {
                    res.status(200).json(gem);
                }
            } else {
                console.log(2);
                const gem = await getAllGems();
                console.log(gem)
                if (gem.length <= 0) {
                    return res
                        .status(404)
                        .send('Empty gem list')
                } else {
                    res.status(200).json(gem);
                }
            }

        } else if (!firstPrice && secondPrice) {
            console.log(3);

            const gem = await getGemByPrices(0, secondPrice);
            console.log(gem)
            if (gem.length <= 0) {
                return res
                    .status(404)
                    .send('Empty gem list')
            } else {
                res.status(200).json(gem);
            }
        } else if (firstPrice && !secondPrice) {
            console.log(4);
            const gem = await getGemByPrices(firstPrice, 999999);
            console.log(gem)
            if (gem.length <= 0) {
                return res
                    .status(404)
                    .send('Empty gem list')
            } else {
                res.status(200).json(gem);
            }
        } else {
            console.log(5);

            const gem = await getAllGems();
            console.log(gem)
            if (gem.length <= 0) {
                return res
                    .status(404)
                    .send('Empty gem list')
            } else {
                res.status(200).json(gem);
            }
        }

    } catch (error) {
        res.status(500).send(error);
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
    deleteGemById,
    getGemByPrice
}