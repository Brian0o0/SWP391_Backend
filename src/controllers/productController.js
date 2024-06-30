//Product functionality handles receiving and sending data from the database to the user
const { getAllProducts, getProductByIds, insertProducts, updateProductByIds, deleteProductByIds, getProductByNameOrIds, getProductByCategorys } = require('../services/productServices')


const getAllProduct = async (req, res) => {
    try {
        const product = await getAllProducts();
        if (product == null) {
            return res
                .status(404)
                .send('Empty product list')
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.query.productId;
        const product = await getProductByIds(productId);
        console.log(product);
        if (product == null) {
            return res
                .status(404)
                .send('Empty product list')
        } else {
            res.status(200).json(product);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

const insertProduct = async (req, res) => {
    try {
        const { name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description, quantityMaterial } = req.body
        if (name && materialId && gemId && categoryId && materialCost && gemCost && productCost && image && quantityGem && size && warrantyCard && description && quantityMaterial) {

            const check = await insertProducts(name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description, quantityMaterial);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert product  fail')
            } else {
                return res
                    .status(200)
                    .status('Insert product successfully')
            }
        } else {
            return res.status(400).send('name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description and quantityMaterial is required')
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const deleteProductById = async (req, res) => {
    try {
        const { productId } = req.body
        const check = await deleteProductByIds(productId);
        if (check == false) {
            return res
                .status(500)
                .send('Delete product fail')
        } else {
            return res
                .status(200)
                .send('Delete product successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
    }
}

const updateProductById = async (req, res) => {
    try {
        const { name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description, quantityMaterial, productId } = req.body
        const check = await updateProductByIds(name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description, quantityMaterial, productId);
        console.log(check);
        if (check == false) {
            return res
                .status(500)
                .send('Update product fail')
        } else {
            return res
                .status(200)
                .send('Update product successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
    }
}

const getProductByNameOrId = async (req, res) => {
    try {

        const name = req.query.name;
        const product = await getProductByNameOrIds(name);
        console.log(product);
        if (product.length === 0 || !product) {
            return res
                .status(404)
                .send('Empty product list')
        } else {
            res.status(200).json(product);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

const getProductByCategory = async (req, res) => {
    try {

        const categoryName = req.query.categoryName;
        console.log(categoryName);
        const product = await getProductByCategorys(categoryName);
        if (product.length <= 0) {
            return res
                .status(404)
                .send('Empty product list')
        } else {
            res.status(200).json(product);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    getAllProduct,
    getProductById,
    insertProduct,
    deleteProductById,
    updateProductById,
    getProductByNameOrId,
    getProductByCategory,
}