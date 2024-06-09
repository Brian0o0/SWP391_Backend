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
            res.status(404).json({ message: 'Categories not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
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
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// Thêm category mới
const insertCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (name && description) {
            const check = await insertCategorys(name, description);
            if (check == true) {
                res.status(201).json({ message: 'Category created successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create category' });
            }
        } else {
            return res.json({
                status: 'err',
                message: 'Description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate and orderId is required'
            });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// Cập nhật category theo ID
const updateCategoryById = async (req, res) => {
    try {
        const { categoryId, name, description } = req.body;
        const check = await updateCategoryByIds(categoryId, name, description);
        if (check) {
            res.status(200).json({ message: 'Category updated successfully' });
        } else {
            res.status(400).json({ message: 'Failed to update category' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// Xóa category theo ID
const deleteCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const check = await deleteCategoryByIds(categoryId);
        if (check) {
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(400).json({ message: 'Failed to delete category' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

module.exports = {
    getAllCategory,
    getCategoryById,
    insertCategory,
    updateCategoryById,
    deleteCategoryById,
};
