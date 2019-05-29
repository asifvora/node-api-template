const {
  validateLoginRequest,
  validateCreateUserRequest,
  validateUpdateUserRequest,
  validateChangePasswordRequest,
} = require('./users.request.validators');
const { createNewUser, loginUser, updateUser, changeUserPassword } = require('./users.services');
const { sendResponse, handleCustomError } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');

async function createNewUserController(req, res) {
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

async function loginUserController(req, res) {
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

async function updateUserController(req, res) {
  try {
    const validationErr = validateUpdateUserRequest(req);

    if (validationErr) {
      return sendResponse(res, 422, {}, validationErr[0].msg);
    }

    const { oldEmail, newEmail, password } = req.body;
    const { id: userId } = req.user;

    const data = await updateUser({ userId, oldEmail, newEmail, password });
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return handleCustomError(res, err);
  }
}

async function changeUserPasswordController(req, res) {
  try {
    const validationErr = validateChangePasswordRequest(req);
    
    if (validationErr) {
      return sendResponse(res, 422, {}, validationErr[0].msg);
    }

    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    const data = await changeUserPassword({ id, oldPassword, newPassword });

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
};
