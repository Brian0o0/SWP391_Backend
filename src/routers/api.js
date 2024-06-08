//The api sent to the frontend

const express = require('express');
const router = express.Router();
const { getUser, getUserById, updateUserById, deleteUserById, insertUser } = require('../services/userServices');
const { register, login } = require('../controllers/userController');
const { getAllProduct, getProductById, insertProduct, updateProductById, deleteProductById } = require('../controllers/productController');
const { getAllCostGem, getCostGemById, insertCostGem, deleteCostGemById, updateCostGemById, getAllGem, getGemById, insertGem, updateGemById, deleteGemById } = require('../controllers/gemController');
const { getAllCostMaterial, getCostMaterialById, insertCostMaterial, deleteCostMaterialById, updateCostMaterialById, getAllMaterial, getMaterialById, insertMaterial, updateMaterialById, deleteMaterialById } = require('../controllers/materialController');
const { getAllStep, getStepById, insertStep, deleteStepById, updateStepById, getAllOrderProgress, getOrderProgressById, insertOrderProgress, deleteOrderProgressById, updateOrderProgressById, getAllOrder, getOrderById, insertOrder, deleteOrderById, updateOrderById, getAllOrderDetail, getOrderDetailById, insertOrderDetail, updateOrderDetailById, deleteOrderDetailById } = require('../controllers/orderController');

//api prodcuct
router.get('/test/getAllProduct', getAllProduct);
router.get('/test/getProductById', getProductById);
router.delete('/test/insertProduct', insertProduct);
router.put('/test/updateProductById', updateProductById);
router.put('/test/deleteProductById', deleteProductById);

//api user
router.get('/', getUser);
router.get('/test/get', getUserById);
router.put('/test/update', updateUserById);
router.delete('/test/delete', deleteUserById);
router.post('/test/insert', insertUser);
router.post('/test/register', register)
router.put('/test/login', login);

//api cost gem
router.get('/test/getAllCostGem', getAllCostGem);
router.get('/test/getCostGemById', getCostGemById);
router.post('/test/insertCostGem', insertCostGem);
router.delete('/test/deleteCostGemById', deleteCostGemById);
router.put('/test/updateCostGemById', updateCostGemById);

//api gem
router.get('/test/getAllGem', getAllGem);
router.get('/test/getGemById', getGemById);
router.post('/test/insertGem', insertGem);
router.put('/test/updateGemById', updateGemById);
router.delete('/test/deleteGemById', deleteGemById);

//api cost material
router.get('/test/getAllCostMaterial', getAllCostMaterial);
router.get('/test/getCostMaterialById', getCostMaterialById);
router.post('/test/insertCostMaterial', insertCostMaterial);
router.put('/test/updateCostMaterialById', updateCostMaterialById);
router.delete('/test/deleteCostMaterialById', deleteCostMaterialById);

//api material
router.get('/test/getAllMaterial', getAllMaterial);
router.get('/test/getMaterialById', getMaterialById);
router.post('/test/insertMaterial', insertMaterial);
router.put('/test/updateMaterialById', updateMaterialById);
router.delete('/test/deleteMaterialById', deleteMaterialById);

//api step
router.get('/test/getAllStep', getAllStep);
router.get('/test/getStepById', getStepById);
router.post('/test/insertStep', insertStep);
router.put('/test/updateStepById', updateStepById);
router.delete('/test/deleteStepById', deleteStepById);

//api order progress
router.get('/test/getAllOrderProgress', getAllOrderProgress);
router.get('/test/getOrderProgressById', getOrderProgressById);
router.post('/test/insertOrderProgress', insertOrderProgress);
router.put('/test/updateOrderProgressById', updateOrderProgressById);
router.delete('/test/deleteOrderProgressById', deleteOrderProgressById);

//api order progress
router.get('/test/getAllOrder', getAllOrder);
router.get('/test/getOrderById', getOrderById);
router.post('/test/insertOrder', insertOrder);
router.put('/test/updateOrderById', updateOrderById);
router.delete('/test/deleteOrderById', deleteOrderById);

//api order progress
router.get('/test/getAllOrderDetail', getAllOrderDetail);
router.get('/test/getOrderDetailById', getOrderDetailById);
router.post('/test/insertOrderDetail', insertOrderDetail);
router.put('/test/updateOrderDetailById', updateOrderDetailById);
router.delete('/test/deleteOrderDetailById', deleteOrderDetailById);


//api category
// router.get('/test/getAllCategories', getAllCategories);
// router.get('/test/getCategoryById', getCategoryById);
// router.post('/test/insertCategory', insertCategory);
// router.delete('/test/deleteCategoryById', deleteCategoryById);
// router.put('/test/updateCategoryById', updateCategoryById);


module.exports = router;