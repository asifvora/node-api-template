const userRoutes = require('express').Router();
const isAuthenticated = require('../../middlewares/authenticated');
const { loginUserController, createNewUserController,
  updateUserController, changeUserPasswordController,
  getUsersController, deleteUserController } = require('./controller');

userRoutes.get('/users', isAuthenticated, getUsersController);
userRoutes.post('/users/login', loginUserController);
userRoutes.post('/users/new', createNewUserController);
userRoutes.put('/users/update/:userId', isAuthenticated, updateUserController);
userRoutes.patch('/users/password', isAuthenticated, changeUserPasswordController);
userRoutes.delete('/users/:userId', isAuthenticated, deleteUserController);

module.exports = userRoutes;
