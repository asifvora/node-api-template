const validateLoginRequest = (req) => {
  req
    .checkBody('email', 'user email is required/invalid')
    .isEmail()
    .exists();
  req
    .checkBody('password', 'user password is required')
    .isLength({ min: 6 })
    .exists();
  return req.validationErrors();
}

const validateCreateUserRequest = (req) => {
  req
    .checkBody('email', 'user email is required/invalid')
    .isEmail()
    .exists();
  req
    .checkBody('password', 'user password is required')
    .isLength({ min: 6 })
    .exists();
  req
    .checkBody('firstName', 'user firstName is required')
    .isString()
    .isLength({ min: 3 })
    .exists();
  req
    .checkBody('lastName', 'user lastName is required')
    .isString()
    .isLength({ min: 3 })
    .exists();
  return req.validationErrors();
}

const validateUpdateUserRequest = (req) => {
  req
    .checkBody('email', 'user email is required/invalid')
    .isEmail()
    .exists();
  req
    .checkBody('firstName', 'user firstName is required')
    .isString()
    .isLength({ min: 3 })
    .exists();
  req
    .checkBody('lastName', 'user lastName is required')
    .isString()
    .isLength({ min: 3 })
    .exists();
  return req.validationErrors();
}

const validateChangePasswordRequest = (req) => {
  req
    .checkBody('oldPassword', 'user oldPassword is required')
    .isLength({ min: 6 })
    .exists();
  req
    .checkBody('newPassword', 'user newPassword is required')
    .isLength({ min: 6 })
    .exists();
  return req.validationErrors();
}

module.exports = {
  validateLoginRequest,
  validateCreateUserRequest,
  validateUpdateUserRequest,
  validateChangePasswordRequest,
};
