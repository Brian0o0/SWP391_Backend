//The api sent to the frontend

const express = require('express');
const router = express.Router();
const { getUser, getUserById, updateUserById, deleteUserById, insertUser } = require('../services/userServices');
const { createUser, login } = require('../controllers/userController');
const { getAllProduct, getProductById, deleteProductById, updateProductById } = require('../services/productServices');
const { getAllCostGem, getCostGemById, insertCostGem, deleteCostGemById, updateCostGemById } = require('../controllers/gemController');
const { getCategoryById, getAllCategories, insertCategory, updateCategoryById, deleteCategoryById } = require('../services/categoryServices');

router.get('/test/getProductById', getProductById);
router.get('/test/getAllProduct', getAllProduct);
router.get('/', getUser);
router.get('/test/get', getUserById);
router.put('/test/update', updateUserById);
router.delete('/test/delete', deleteUserById);
router.post('/test/insert', insertUser);
router.post('/test/createUser', createUser)
router.put('/test/login', login);
router.delete('/test/deleteProductById', deleteProductById);
router.put('/test/updateProductById', updateProductById);

router.get('/test/getAllCostGem', getAllCostGem);
router.get('/test/getCostGemById', getCostGemById);
router.post('/test/insertCostGem', insertCostGem);
router.delete('/test/deleteCostGemById', deleteCostGemById);
router.put('/test/updateCostGemById', updateCostGemById);

router.get('/test/getAllCategories', getAllCategories);
router.get('/test/getCategoryById', getCategoryById);
router.post('/test/insertCategory', insertCategory);
router.delete('/test/deleteCategoryById', deleteCategoryById);
router.put('/test/updateCategoryById',  updateCategoryById);
module.exports = router;