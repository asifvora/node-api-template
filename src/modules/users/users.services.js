const { MySQL } = require('../../db');
const Users = require('./users.model');
const { hashPayload, jwt } = require('../../utils');

async function createNewUser({
  email, password, firstName, lastName,
}) {
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
    user: { ...newUser._doc }
  };
}

async function loginUser({ email, password }) {
  const hashedPassword = await hashPayload(password);
  const res = await Users.findOne({ email: email, password: hashedPassword });

  if (!res) {
    const msg = 'Invalid email or password.';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  const accessToken = jwt.createAccessToken({
    id: res._id,
    email: res.email,
    firstName: res.firstName,
    lastName: res.lastName,
    tokenType: 'LoginToken',
  });

  delete res.password;

  return {
    user: res,
    token: accessToken,
  };
}

async function updateUser({
  userId, oldEmail, newEmail, password,
}) {
  const res = await MySQL.sequelize.query('SELECT * FROM users WHERE id = ?', {
    type: MySQL.sequelize.QueryTypes.SELECT,
    replacements: [userId],
  });

  if (!res[0]) {
    const msg = 'User not found in records';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  if (res[0].email !== oldEmail) {
    const msg = 'Invalid userId and userEmail combination';
    const err = new Error(msg);
    err.code = 401;
    err.msg = msg;
    throw err;
  }

  const hashedPassword = await hashPayload(password);

  if (res[0].password !== hashedPassword) {
    const msg = 'Incorrect credential, Not allowed';
    const err = new Error(msg);
    err.code = 401;
    err.msg = msg;
    throw err;
  }

  await MySQL.sequelize.query('UPDATE users SET email = ? WHERE id = ?', {
    type: MySQL.sequelize.QueryTypes.UPDATE,
    replacements: [newEmail, userId],
  });
  return {};
}

async function changeUserPassword({ id, oldPassword, newPassword }) {
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

module.exports = {
  createNewUser,
  loginUser,
  updateUser,
  changeUserPassword
};
