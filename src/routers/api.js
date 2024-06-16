//The api sent to the frontend
require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const router = express.Router();
const { register, login, logout, getAllUser, getUserById, getUserByUserName, deleteUserById, updateUserById, getUserByName, insertUserOnGoogle } = require('../controllers/userController');
const { getAllProduct, getProductById, insertProduct, updateProductById, deleteProductById, getProductByNameOrId, getProductByCategory } = require('../controllers/productController');
const { getAllCostGem, getCostGemById, insertCostGem, deleteCostGemById, updateCostGemById, getAllGem, getGemById, insertGem, updateGemById, deleteGemById, getGemByPrice } = require('../controllers/gemController');
const { getAllCostMaterial, getCostMaterialById, insertCostMaterial, deleteCostMaterialById, updateCostMaterialById, getAllMaterial, getMaterialById, insertMaterial, updateMaterialById, deleteMaterialById } = require('../controllers/materialController');
const { getAllStep, getStepById, insertStep, deleteStepById, updateStepById, getAllOrderProgress, getOrderProgressById, insertOrderProgress, deleteOrderProgressById, updateOrderProgressById, getAllOrder, getOrderById, insertOrder, deleteOrderById, updateOrderById, getAllOrderDetail, getOrderDetailById, insertOrderDetail, updateOrderDetailById, deleteOrderDetailById } = require('../controllers/orderController');
const { getAllCategory, getCategoryById, insertCategory, updateCategoryById, deleteCategoryById, } = require("../controllers/categoryController");
const { getAllBlogs, getBlogById, insertBlog, updateBlogById, deleteBlogById } = require('../services/blogServices');
const { loginSuccess } = require('../controllers/authController')

//api prodcuct
router.get('/test/getAllProduct', getAllProduct);
router.get('/test/getProductById', getProductById);
router.get('/test/getProductByNameOrId', getProductByNameOrId);
router.get('/test/getProductByCategory', getProductByCategory);
router.post('/test/insertProduct', insertProduct);
router.put('/test/updateProductById', updateProductById);
router.delete('/test/deleteProductById', deleteProductById);

//api user
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'], session: false
})
);
router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
        req.user = profile;
        next()
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/login-success/${req.user.UserID}`)
});

router.post('/login-success', loginSuccess)
router.get('/test/getAllUser', getAllUser);
router.get('/test/getUserById', getUserById);
router.get('/test/getUserByUserName', getUserByUserName);
router.get('/test/getUserByName', getUserByName);
router.put('/test/updateUserById', updateUserById);
router.delete('/test/deleteUserById', deleteUserById);
// router.post('/test/insert', insertUser);
router.post('/test/register', register)
// router.post('/test/insertUserOnGoogle', insertUserOnGoogle)
router.post('/test/login', login);
router.post('/test/logout', logout);
//api cost gem
router.get('/test/getAllCostGem', getAllCostGem);
router.get('/test/getCostGemById', getCostGemById);
router.get('/test/getGemByPrice', getGemByPrice);
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

//api order 
router.get('/test/getAllOrder', getAllOrder);
router.get('/test/getOrderById', getOrderById);
router.post('/test/insertOrder', insertOrder);
router.put('/test/updateOrderById', updateOrderById);
router.delete('/test/deleteOrderById', deleteOrderById);

//api order detail progress
router.get('/test/getAllOrderDetail', getAllOrderDetail);
router.get('/test/getOrderDetailById', getOrderDetailById);
router.post('/test/insertOrderDetail', insertOrderDetail);
router.put('/test/updateOrderDetailById', updateOrderDetailById);
router.delete('/test/deleteOrderDetailById', deleteOrderDetailById);


//api category
router.get('/test/getAllCategory', getAllCategory);
router.get('/test/getCategoryById', getCategoryById);
router.post('/test/insertCategory', insertCategory);
router.delete('/test/deleteCategoryById', deleteCategoryById);
router.put('/test/updateCategoryById', updateCategoryById);

//api blog
router.get('/test/getAllBlogs', getAllBlogs);
router.get('/test/getBlogById/:id', getBlogById);
router.post('/test/insertBlog', insertBlog);
router.put('/test/updateBlogById/:id', updateBlogById);
router.delete('/test/deleteBlogById/:id', deleteBlogById);

module.exports = router;