const {
  validateLoginRequest,
  validateCreateUserRequest,
  validateUpdateUserRequest,
  validateChangePasswordRequest,
} = require('./validators');
const { createNewUser, loginUser, updateUser,
  changeUserPassword, deleteUser, getUsers } = require('./services');
const { sendResponse, handleCustomError } = require('../../utils');
const ResponseMessages = require('../../constants/response-messages');

const createNewUserController = async (req, res) => {
  try {
    const validationErr = validateCreateUserRequest(req);

    if (validationErr) {
      return sendResponse(res, 422, {}, validationErr[0].msg);
    }

    const { email, firstName, lastName, password } = req.body;
    const data = await createNewUser({ email, firstName, lastName, password });

    return sendResponse(res, 201, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return handleCustomError(res, err);
  }
}

const loginUserController = async (req, res) => {
  try {
    const validationErr = validateLoginRequest(req);

    if (validationErr) {
      return sendResponse(res, 422, {}, validationErr[0].msg);
    }

    const { email, password } = req.body;
    const data = await loginUser({ email, password });

    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return handleCustomError(res, err);
  }
}

const updateUserController = async (req, res) => {
  try {
    const validationErr = validateUpdateUserRequest(req);

    if (validationErr) {
      return sendResponse(res, 422, {}, validationErr[0].msg);
    }

    const { email, firstName, lastName } = req.body;
    const { userId } = req.params;
    const data = await updateUser({ id: userId, firstName, lastName, email });

    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return handleCustomError(res, err);
  }
}

const changeUserPasswordController = async (req, res) => {
  try {
    const validationErr = validateChangePasswordRequest(req);

    if (validationErr) {
      return sendResponse(res, 422, {}, validationErr[0].msg);
    }

    const { oldPassword, newPassword } = req.body;
    const { userId } = req.params;

    const data = await changeUserPassword({ id: userId, oldPassword, newPassword });

    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return handleCustomError(res, err);
  }
}

const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await deleteUser({ id: userId });

    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return handleCustomError(res, err);
  }
}

const getUsersController = async (req, res) => {
  try {
    const data = await getUsers();

    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return handleCustomError(res, err);
  }
}

module.exports = {
  createNewUserController,
  loginUserController,
  updateUserController,
  changeUserPasswordController,
  deleteUserController,
  getUsersController
};
