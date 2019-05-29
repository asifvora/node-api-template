const userRoutes = require('express').Router();
const isAuthenticated = require('../../middlewares/isAuthenticated');
const { loginUserController, createNewUserController,
  updateUserController, changeUserPasswordController,
  getUsersController, deleteUserController } = require('./users.controller');

userRoutes.get('/users', getUsersController);
userRoutes.post('/users/login', loginUserController);
userRoutes.post('/users/new', createNewUserController);
userRoutes.put('/users/update/:userId', isAuthenticated, updateUserController);
userRoutes.patch('/users/password', isAuthenticated, changeUserPasswordController);
userRoutes.delete('/users/:userId', isAuthenticated, deleteUserController);

module.exports = userRoutes;
