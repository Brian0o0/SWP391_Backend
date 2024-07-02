//Product functionality handles receiving and sending data from the database to the user
const { getAllProducts, getProductByIds, insertProducts, updateProductByIds, deleteProductByIds, getProductByNameOrIds, getProductByCategorys } = require('../services/productServices')


const getAllProduct = async (req, res) => {
    try {
        const product = await getAllProducts();
        if (product.length <= 0) {
            return res
                .status(404)
                .send('Empty product list')
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.query.ProductId;
        const product = await getProductByIds(productId);
        console.log(product);
        if (product.length <= 0) {
            return res
                .status(404)
                .send('Product not found')
        } else {
            res.status(200).json(product);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const insertProduct = async (req, res) => {
    try {
        const { Name, MaterialId, GemId, CategoryId, MaterialCost, GemCost, ProductCost, Image, QuantityGem, Size, WarrantyCard, Description, QuantityMaterial } = req.body
        if (Name && MaterialId && GemId && CategoryId && MaterialCost && GemCost && ProductCost && Image && QuantityGem && Size && WarrantyCard && Description && QuantityMaterial) {

            const check = await insertProducts(Name, MaterialId, GemId, CategoryId, MaterialCost, GemCost, ProductCost, Image, QuantityGem, Size, WarrantyCard, Description, QuantityMaterial);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert product  fail')
            } else {
                return res
                    .status(200)
                    .send('Insert product successfully')
            }
        } else {
            return res.status(400).send('Name, materialId, gemId, categoryId, materialCost, gemCost, productCost, image, quantityGem, size, warrantyCard, description and uantityMaterial is required')
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

const deleteProductById = async (req, res) => {
    try {
        const { ProductId } = req.body
        const check = await deleteProductByIds(ProductId);
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
            .send(error.message)
    }
}

const updateProductById = async (req, res) => {
    try {
        const { Name, MaterialId, GemId, CategoryId, MaterialCost, GemCost, ProductCost, Image, QuantityGem, Size, WarrantyCard, Description, QuantityMaterial, ProductId } = req.body
        const check = await updateProductByIds(Name, MaterialId, GemId, CategoryId, MaterialCost, GemCost, ProductCost, Image, QuantityGem, Size, WarrantyCard, Description, QuantityMaterial, ProductId);
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
            .send(error.message)
    }
}

const getProductByNameOrId = async (req, res) => {
    try {

        const name = req.query.Name;
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
        res.status(500).send(error.message);
    }
}

const getProductByCategory = async (req, res) => {
    try {

        const categoryName = req.query.CategoryName;
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
        res.status(500).send(error.message);
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