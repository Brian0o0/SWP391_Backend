const express = require('express');
const router = express.Router();
const { getUser, getUserById, updateUserById, deleteUserById, insertUser } = require('../controllers/homeController');
const { createUserController, login } = require('../controllers/userController');


router.get('/', getUser);
router.get('/test/get', getUserById);
router.put('/test/update', updateUserById);
router.delete('/test/delete', deleteUserById);
router.post('/test/insert', insertUser);
router.post('/test/createUser', createUserController)
router.put('/test/login', login);
module.exports = router;