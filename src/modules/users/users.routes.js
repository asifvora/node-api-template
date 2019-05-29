const userRoutes = require('express').Router();
const isAuthenticated = require('../../middlewares/isAuthenticated');
const { loginUserController, createNewUserController,
  changeUserEmailController, changeUserPasswordController } = require('./users.controller');

userRoutes.post('/users/login', loginUserController);
userRoutes.post('/users/new', createNewUserController);
userRoutes.patch('/users/email', isAuthenticated, changeUserEmailController);
userRoutes.patch('/users/password', isAuthenticated, changeUserPasswordController);

module.exports = userRoutes;
