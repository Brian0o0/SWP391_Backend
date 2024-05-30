//The api sent to the frontend

const express = require('express');
const router = express.Router();
const { getUser, getUserById, updateUserById, deleteUserById, insertUser } = require('../services/userServices');
const { createUser, login } = require('../controllers/userController');
const { getAllProduct, getProductById, deleteProductById, updateProductById } = require('../services/productServices');

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


module.exports = router;