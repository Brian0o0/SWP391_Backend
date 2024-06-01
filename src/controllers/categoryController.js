//Category functionality handles receiving and sending data from the database to the user
//Gem functionality handles receiving and sending data from the database to the user
const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategoryById,
    insertCategory,
    updateCategoryById,
    deleteCategoryById,
} = require('../services/categoryService');

// Lấy tất cả các category
router.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories();
        if (categories) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({ message: 'Categories not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Lấy category theo ID
router.get('/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Thêm category mới
router.post('/categories', async (req, res) => {
    try {
        const { name, description } = req.body;
        const success = await insertCategory(name, description);
        if (success) {
            res.status(201).json({ message: 'Category created successfully' });
        } else {
            res.status(400).json({ message: 'Failed to create category' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Cập nhật category theo ID
router.put('/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, description } = req.body;
        const success = await updateCategoryById(categoryId, name, description);
        if (success) {
            res.status(200).json({ message: 'Category updated successfully' });
        } else {
            res.status(400).json({ message: 'Failed to update category' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Xóa category theo ID
router.delete('/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const success = await deleteCategoryById(categoryId);
        if (success) {
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(400).json({ message: 'Failed to delete category' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
