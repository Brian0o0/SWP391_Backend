//Product functionality handles receiving and sending data from the database to the user
const { getAllProducts, getProductByIds, insertProducts, updateProductByIds, deleteProductByIds } = require('../services/productServices')


const getAllProduct = async (req, res) => {
    try {
        const product = await getAllProducts();
        if (product == null) {
            return res.json({
                status: 'err',
                message: 'Empty product list'
            });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const getProductById = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await getProductByIds(productId);
        console.log(product);
        if (product == null) {
            return res.json({
                status: 'err',
                message: 'Empty product list'
            });
        } else {
            res.json(product);
        }

    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        });
    }
}

const insertProduct = async (req, res) => {
    try {
        const { name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description } = req.body
        if (name && materialId && gemId && categoryId && materialCost && gemCost && productCost && image && quantityGem && size && warrantyCard && description) {

            const check = await insertProducts(name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description);
            if (check == false) {
                return res.json({
                    status: 'error',
                    message: 'Insert product  fail'
                });
            } else {
                return res.json({
                    status: 'success',
                    message: 'Insert product successfully'
                });
            }
        } else {
            return res.json({
                status: 'err',
                message: 'name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard and description is required'
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

const deleteProductById = async (req, res) => {
    try {
        const { productId } = req.body
        const check = await deleteProductByIds(productId);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Delete product fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Delete product successfully'
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

const updateProductById = async (req, res) => {
    try {
        const { name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description, productId } = req.body
        const check = await updateProductByIds(name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description, productId);
        console.log(check);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Update product fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Update product successfully'
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
    getAllProduct,
    getProductById,
    insertProduct,
    deleteProductById,
    updateProductById
}