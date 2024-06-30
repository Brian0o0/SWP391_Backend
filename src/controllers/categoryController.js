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
            res.status(404).send('Empty categories list');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Lấy category theo ID
const getCategoryById = async (req, res) => {
    try {
        const CategoryId = req.query.CategoryId;
        const category = await getCategoryByIds(CategoryId);
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
        const { Name, Description } = req.body;
        if (Name && Description) {
            const check = await insertCategorys(Name, Description);
            if (check == true) {
                res.status(201).send('Category created successfully');
            } else {
                res.status(400).send('Failed to create category');
            }
        } else {
            return res
                .status(400)
                .send('Description and name is required');
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Cập nhật category theo ID
const updateCategoryById = async (req, res) => {
    try {
        const { CategoryId, Name, Description } = req.body;
        let find = await getCategoryById(CategoryId);
        if (find.length <= 0) {
            return res
                .status(404)
                .send('Category does not exist')
        } else {
            if (CategoryId && Name && Description) {
                const check = await updateCategoryByIds(CategoryId, Name, Description);
                if (check) {
                    res.status(200).send('Category updated successfully');
                } else {
                    res.status(400).send('Failed to update category');
                }
            } else {
                return res
                    .status(400)
                    .send('CategoryId, name and description is required')
            }
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Xóa category theo ID
const deleteCategoryById = async (req, res) => {
    try {
        const { CategoryId } = req.body;
        let find = await getCategoryById(CategoryId);
        if (find.length <= 0) {
            return res
                .status(404)
                .send('Category does not exist')
        } else {
            const check = await deleteCategoryByIds(CategoryId);
            if (check) {
                res.status(200).send('Category deleted successfully');
            } else {
                res.status(400).send('Failed to delete category');
            }
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
