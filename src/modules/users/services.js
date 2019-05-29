const mongoose = require('mongoose');
const Users = require('./model');
const { hashPayload, jwt } = require('../../utils');

const createNewUser = async ({ email, password, firstName, lastName }) => {
  const res = await Users.findOne({ email: email });

  if (res) {
    const msg = 'Email already exits.';
    const err = new Error(msg);
    err.code = 409;
    err.msg = msg;
    throw err;
  }

  const hashedPassword = await hashPayload(password);
  const user = new Users({ email, firstName, lastName, password: hashedPassword });
  const newUser = await user.save();

  return {
    user: {
      id: newUser._id, firstName, lastName, email
    }
  };
}

const loginUser = async ({ email, password }) => {
  const hashedPassword = await hashPayload(password);
  const res = await Users.findOne({ email: email, password: hashedPassword });

  if (!res) {
    const msg = 'Invalid email or password.';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  const user = {
    id: res._id,
    email: res.email,
    firstName: res.firstName,
    lastName: res.lastName
  };
  const accessToken = jwt.createAccessToken({ ...user, tokenType: 'LoginToken' });

  return {
    user,
    token: accessToken,
  };
}

const updateUser = async ({ id, firstName, lastName, email }) => {
  const res = await Users.findById({ _id: id });

  if (!res) {
    const msg = 'User not found in records';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  const checkEmail = await Users.find({ _id: { $ne: id }, email });

  if (checkEmail.length) {
    const msg = 'Email already exits.';
    const err = new Error(msg);
    err.code = 409;
    err.msg = msg;
    throw err;
  }

  await Users.update({ _id: id }, { firstName, lastName, email });

  return {
    id, firstName, lastName, email
  };
}

const changeUserPassword = async ({ id, oldPassword, newPassword }) => {
  const res = await Users.findById({ _id: id });

  if (!res) {
    const msg = 'User not found in records';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  const oldHashedPassword = await hashPayload(oldPassword);

  if (res.password !== oldHashedPassword) {
    const msg = 'Incorrect credential, Not allowed';
    const err = new Error(msg);
    err.code = 401;
    err.msg = msg;
    throw err;
  }

  const newHashedPassword = await hashPayload(newPassword);
  await Users.update({ _id: id }, { password: newHashedPassword });

  return {};
}

const deleteUser = async ({ id }) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const msg = 'Invalid id.';
    const err = new Error(msg);
    err.code = 422;
    err.msg = msg;
    throw err;
  }

  const res = await Users.findOneAndDelete({ _id: id });

  if (!res) {
    const msg = 'User not found in records';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  return {};
}

const getUsers = async () => {
  const users = await Users.find({}, { _id: 1, firstName: 1, lastName: 1, email: 1 });

  if (!users) {
    const msg = 'Record not available.';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  return { users };
}

module.exports = {
  createNewUser,
  loginUser,
  updateUser,
  changeUserPassword,
  deleteUser,
  getUsers
};
