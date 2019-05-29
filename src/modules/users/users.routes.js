const userRoutes = require('express').Router();
const isAuthenticated = require('../../middlewares/isAuthenticated');
const { loginUserController, createNewUserController,
  updateUserController, changeUserPasswordController, deleteUserController } = require('./users.controller');

userRoutes.post('/users/login', loginUserController);
userRoutes.post('/users/new', createNewUserController);
userRoutes.put('/users/update', isAuthenticated, updateUserController);
userRoutes.patch('/users/password', isAuthenticated, changeUserPasswordController);
userRoutes.delete('/users/:userId', isAuthenticated, deleteUserController);

module.exports = userRoutes;
