//Category functionality handles receiving and sending data from the database to the user
//Gem functionality handles receiving and sending data from the database to the user
const express = require('express');
const router = express.Router();
const {
    getAllCategorys,
    getCategoryByIds,
    insertCategorys,
    updateCategoryByIds,
    deleteCategoryByIds,
} = require('../services/categoryServices');

// Lấy tất cả các category
const getAllCategory = async (req, res) => {
    try {
        const categories = await getAllCategorys();
        if (categories) {
            res.status(200).json(categories);
        } else {
            res.status(404).send ('Categories not found');
        }
    } catch (error) {
        res.status(500).send (error.message);
    }
}

// Lấy category theo ID
const getCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const category = await getCategoryByIds(categoryId);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).send('Category not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Thêm category mới
const insertCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (name && description) {
            const check = await insertCategorys(name, description);
            if (check == true) {
                res.status(201).send('Category created successfully');
            } else {
                res.status(400).send('Failed to create category');
            }
        } else {
            return res
                .status(400)
                .send ('Description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate and orderId is required');
        }

    } catch (error) {
        res.status(500).send( error.message);
    }
}

// Cập nhật category theo ID
const updateCategoryById = async (req, res) => {
    try {
        const { categoryId, name, description } = req.body;
        const check = await updateCategoryByIds(categoryId, name, description);
        if (check) {
            res.status(200).send('Category updated successfully');
        } else {
            res.status(400).send('Failed to update category' );
        }
    } catch (error) {
        res.status(500).send (error.message);
    }
}

// Xóa category theo ID
const deleteCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const check = await deleteCategoryByIds(categoryId);
        if (check) {
            res.status(200).send ('Category deleted successfully');
        } else {
            res.status(400).send ('Failed to delete category');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllCategory,
    getCategoryById,
    insertCategory,
    updateCategoryById,
    deleteCategoryById,
};
